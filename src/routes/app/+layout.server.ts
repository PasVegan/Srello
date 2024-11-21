import type {LayoutServerLoad} from './$types';
import {Collections} from "$lib/pocketbase-types";
import {error} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({locals}) => {
    // Fetch the user workspaces
    try {
        const workspaces = await locals.pb.collection(Collections.Workspaces).getFullList({
            filter: locals!.user!.workspaces.map((id) => `id="${id}"`).join("||"),
        });
        return {
            props: {
                user: locals!.user!,
                workspaces: workspaces
            }
        };
    } catch (err) {
        // @ts-ignore
        throw error(err.status, err.message);
    }
};