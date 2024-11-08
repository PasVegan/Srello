// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type {TypedPocketBase, UsersResponse} from "$lib/pocketbase-types";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            pb: TypedPocketBase;
            user: UsersResponse | undefined;
        }

        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
