import type { LayoutServerLoad } from './$types';
import {Collections} from "$lib/pocketbase-types";

export const load: LayoutServerLoad = async ({ locals }) => {
    // Fetch the user workspaces
    const workspaces = await locals.pb.collection(Collections.Workspaces).getFullList({
        filter: `users_via_workspaces.id ~ "${locals.user!.id}"`,
    })
    return {
        props: {
            user: locals!.user!,
            workspaces: workspaces
        }
    };
};