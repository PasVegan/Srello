import type {Actions} from './$types';
import {generateUsername} from "$lib/utils";
import {error, redirect} from "@sveltejs/kit";

export const actions = {
    register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        const username = generateUsername(body.name.toString().split(' ').join('')).toLowerCase();

        try {
            await locals.pb.collection('users').create({username, ...body});
            await locals.pb.collection('users').requestVerification(body.email.toString());
        } catch (err) {
            console.log('Error registering user', err);
            throw error(500, 'Error registering user');
        }

        throw redirect(303, '/login');
    }
} satisfies Actions;