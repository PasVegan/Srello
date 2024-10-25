import type {Actions} from './$types';
import {error} from "@sveltejs/kit";
import {Collections} from "$lib/pocketbase-types";

export const actions = {
    forgot: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            return {
                success: await locals.pb.collection(Collections.Users).requestPasswordReset(body.email.toString())
            }
        } catch (err) {
            console.log('Error resetting password', err);
            throw error(500, 'Error resetting password');
        }
    }
} satisfies Actions;