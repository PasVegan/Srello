import type {LayoutServerLoad} from './$types';
import {Collections} from "$lib/pocketbase-types";

export const load: LayoutServerLoad = async ({locals}) => {
    // Fetch the user workspaces
    const workspaces = await locals.pb.collection(Collections.Workspaces).getFullList({
        filter: locals!.user!.workspaces.map((id) => `id="${id}"`).join("||"),
    });
    return {
        props: {
            user: locals!.user!,
            workspaces: workspaces
        }
    };
};