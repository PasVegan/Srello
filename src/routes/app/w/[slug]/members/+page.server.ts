import type {Actions} from './$types';
import {Collections} from "$lib/pocketbase-types";
import {error} from "@sveltejs/kit";

export const actions = {
    addMember: async ({params, locals, request}) => {
        const workspaceId = params.slug;
        const body = Object.fromEntries(await request.formData());

        try {
            // Get user by email
            const resUser = await locals.pb.collection(Collections.Users).getFirstListItem(
                locals.pb.filter("email = {:email}", {email: body.email}));
            if (!resUser) {
                return error(400, 'User not found');
            }
            await locals.pb.collection(Collections.Users).update(resUser.id, {
                "workspaces+": workspaceId,
            });
        } catch (err) {
            // @ts-ignore
            return error(err.status, err.message);
        }
    },
    deleteMember: async ({url, params, locals}) => {
        const workspaceId = params.slug;
        const userId = url.searchParams.get('id');

        if (!userId) {
            return error(400, 'User ID is required');
        }
        if (userId === locals.user?.id) {
            return error(400, 'You cannot delete yourself');
        }

        try {
            await locals.pb.collection(Collections.Users).update(userId, {
                "workspaces-": workspaceId,
            });
        } catch (error) {
            // @ts-ignore
            return error(err.status, err.message);
        }
    }
} satisfies Actions;
