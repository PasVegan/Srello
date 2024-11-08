import type { Actions } from './$types';
import {Collections} from "$lib/pocketbase-types";
import {error} from "@sveltejs/kit";

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
                return false;
            }
            await locals.pb.collection(Collections.Workspaces).update(workspaceId, {
                "members+": resUser.id,
            })
            await locals.pb.collection(Collections.Users).update(resUser.id, {
                "workspaces+": workspaceId,
            });
            return true;
        } catch (err) {
            console.log('Error adding member', err);
            throw error(500, 'Error creating workspace');
        }
    },
    deleteMember: async ({params, locals, request }) => {
    // TODO register the user
    }
} satisfies Actions;