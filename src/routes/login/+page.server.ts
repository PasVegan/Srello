import type {Actions} from './$types';
import {error, redirect} from "@sveltejs/kit";
import {Collections} from "$lib/pocketbase-types";

export const actions = {
    login: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            const AuthResponse = await locals.pb.collection(Collections.Users).authWithPassword(body.email.toString(), body.password.toString());
            const userRecord = AuthResponse.record;

            if (!userRecord.verified) {
                locals.pb.authStore.clear();
                return {
                    notVerified: true
                }
            }
        } catch (err) {
            console.log('Error logging-in user', err);
            throw error(500, 'Error logging-in user');
        }

        throw redirect(303, '/app');
    }
} satisfies Actions;