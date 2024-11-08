import type {LayoutServerLoad} from './$types';
import {Collections, type UsersResponse, type WorkspacesResponse} from "$lib/pocketbase-types";

interface Texpand {
    users_via_workspaces: UsersResponse[]
}

export const load: LayoutServerLoad = async ({locals, params}) => {
    // Fetch the workspace and its users
    const workspace = await locals.pb.collection(Collections.Workspaces).getOne<WorkspacesResponse<Texpand>>(
        params.slug as string,
        {expand: "users_via_workspaces"}
    );

    // Process all avatar URLs in parallel
    if (workspace.expand?.users_via_workspaces) {
        workspace.expand.users_via_workspaces = await Promise.all(
            workspace.expand.users_via_workspaces.map(user => {
                const avatarUrl = locals.pb.files.getUrl(user, user.avatar);
                return {...user, avatar: avatarUrl};
            })
        );
    }

    return {
        props: {
            user: locals!.user!,
            workspace: workspace
        }
    };
};