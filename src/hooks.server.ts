import {type Handle, redirect} from "@sveltejs/kit";
import PocketBase from 'pocketbase';
import {serializeNonPOJOs} from "$lib/utils";
import {pbURL} from "$lib/globals";
import {Collections, type TypedPocketBase} from "$lib/pocketbase-types";

export const handle: Handle = async ({event, resolve}): Promise<Response> => {
    // Check if the user is authenticated
    event.locals.pb = new PocketBase(pbURL) as TypedPocketBase;
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    let isLogged: boolean = false;

    if (event.locals.pb.authStore.isValid) {
        try {
            await event.locals.pb.collection(Collections.Users).authRefresh();
        } catch (err) {
            console.error('Error refreshing auth token', err);
            event.locals.pb.authStore.clear();
            event.request.headers.delete('cookie');
            throw redirect(303, '/login');
        }
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
        event.locals.user!.avatar = event.locals.pb.files.getURL(event.locals.user!, event.locals.user!.avatar);
        isLogged = true;
    } else {
        event.locals.user = undefined;
    }

    // redirect to /app if the user is logged in and tries to access /landing
    if (isLogged && (event.url.pathname === "/landing" || event.url.pathname === "/login" || event.url.pathname === "/register" || event.url.pathname === "/")) {
        throw redirect(303, "/app")
    } else if (!isLogged && (event.url.pathname.startsWith("/app") || event.url.pathname === "/")) {
        // redirect to /landing if the user is not logged in and tries to access /app
        throw redirect(303, "/landing")
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({secure: true, httpOnly: false}));

    return response;
}