import type { Actions } from './$types';
import {Collections} from "$lib/pocketbase-types";
import {fail} from "@sveltejs/kit";

export const actions = {
    addMember: async ({ params, locals, request }) => {
        const workspaceId = params.slug;
        const body = Object.fromEntries(await request.formData());

        try {
            // Get user by email
            const resUser = await locals.pb.collection(Collections.Users).getFirstListItem(
                locals.pb.filter("email = {:email}", {email: body.email}));
            if (!resUser) {
                console.log('User not found');
                return { success: false };
            }
            await locals.pb.collection(Collections.Workspaces).update(workspaceId, {
                "members+": resUser.id,
            })
            await locals.pb.collection(Collections.Users).update(resUser.id, {
                "workspaces+": workspaceId,
            });
            return { success: true };
        } catch (err) {
            console.log('Error adding member', err);
            return fail(500, {error: 'Error creating workspace'});
        }
    },
    deleteMember: async ({ url, params, locals }) => {
        const workspaceId = params.slug;
        const userId = url.searchParams.get('id');

        if (!userId) {
            return fail(400, { error: 'User ID is required' });
        }
        if (userId === locals.user?.id) {
            return fail(400, { error: 'You cannot delete yourself' });
        }

        try {
            await locals.pb.collection(Collections.Workspaces).update(workspaceId, {
                "members-": userId,
            })
            await locals.pb.collection(Collections.Users).update(userId, {
                "workspaces-": workspaceId,
            });
            return { success: true };
        } catch (error) {
            return fail(500, { error: 'Failed to delete member' });
        }
    }
} satisfies Actions;
