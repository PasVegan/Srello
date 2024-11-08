import type {Actions} from './$types';
import {fail} from "@sveltejs/kit";
import {Collections} from "$lib/pocketbase-types";

export const actions = {
    forgot: async ({locals, request}) => {
        const body = Object.fromEntries(await request.formData());

        try {
            return {
                success: await locals.pb.collection(Collections.Users).requestPasswordReset(body.email.toString())
            }
        } catch (err) {
            console.log('Error resetting password', err);
            return fail(500, {error: 'Error resetting password'});
        }
    }
} satisfies Actions;