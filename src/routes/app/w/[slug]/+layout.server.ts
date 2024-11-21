import type {LayoutServerLoad} from './$types';
import {Collections, type UsersResponse, type WorkspacesResponse} from "$lib/pocketbase-types";

export const load: LayoutServerLoad = async ({locals, params}) => {
    // Fetch the workspace and its users
    const workspace = await locals.pb.collection(Collections.Workspaces).getOne<WorkspacesResponse>(
        params.slug as string,
    );
    let members = await locals.pb.collection(Collections.Users).getFullList<UsersResponse>({
        filter: `workspaces.id ?~ "${workspace.id}"`,
    });

    // Process all avatar URLs in parallel
    if (members) {
        members = await Promise.all(
            members.map(member => {
                const avatarUrl = locals.pb.files.getUrl(member, member.avatar);
                return {...member, avatar: avatarUrl};
            })
        );
    }

    return {
        props: {
            user: locals!.user!,
            workspace: workspace,
            members: members
        }
    };
};