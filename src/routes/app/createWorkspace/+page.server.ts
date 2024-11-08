import {Collections} from "$lib/pocketbase-types";
import {fail, redirect} from "@sveltejs/kit";
// @ts-ignore
import type {Actions} from "$types";


export const actions = {
    // @ts-ignore
    default: async ({locals, request}) => {
        const body = Object.fromEntries(await request.formData());

        try {
            // Create the workspace
            const resWorkspace = await locals.pb.collection(Collections.Workspaces).create({
                name: body.name.toString(),
                members: [locals.user!.id.toString()],
                description: body.description.toString(),
            });
            // Add the workspace to the user's workspaces
            const resUser = await locals.pb.collection(Collections.Users).getOne(locals.user!.id.toString());
            const userWorkspacesIds = resUser.workspaces || [];
            await locals.pb.collection(Collections.Users).update(locals.user!.id.toString(), {
                workspaces: [...userWorkspacesIds, resWorkspace.id]
            })
        } catch (err) {
            console.log('Error creating workspace', err);
            return fail(500, {error: 'Error creating workspace'});
        }

        throw redirect(303, '/app');
    }
} satisfies Actions;