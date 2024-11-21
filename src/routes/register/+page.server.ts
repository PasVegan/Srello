import type {Actions} from './$types';
import {generateUsername} from "$lib/utils";
import {fail, redirect} from "@sveltejs/kit";
import {Collections, type WorkspacesRecord} from "$lib/pocketbase-types";


async function generateAvatarFile(username: string): Promise<File> {
    const seed = username.replace(/[^a-zA-Z0-9]/g, '');
    const style = 'bottts-neutral'; // or any other style: bottts, pixel-art, etc.
    const url = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;

    // Fetch the SVG
    const response = await fetch(url);
    const svgContent = await response.text();

    // Convert SVG to Blob
    const blob = new Blob([svgContent], {type: 'image/svg+xml'});

    // Create a File object
    return new File([blob], `-avatar.svg`, {type: 'image/svg+xml'});
}

export const actions = {
    register: async ({locals, request}) => {
        const body = Object.fromEntries(await request.formData());

        const username = generateUsername(body.name.toString().split(' ').join('')).toLowerCase();

        try {
            // create workspace for user
            let workspace: WorkspacesRecord = {
                name: `${body.name}'s Workspace`,
            }
            const workspaceResp = await locals.pb.collection(Collections.Workspaces).create(workspace);
            // create a user and send verification email
            const avatar = await generateAvatarFile(username);
            await locals.pb.collection('users').create({
                username, ...body,
                avatar,
                workspaces: [workspaceResp.id],
                emailVisibility: true
            });
            await locals.pb.collection(Collections.Users).requestVerification(body.email.toString());
        } catch (err) {
            console.log('Error registering user', err);
            return fail(500, {error: 'Error registering user'});
        }

        throw redirect(303, '/login');
    }
} satisfies Actions;