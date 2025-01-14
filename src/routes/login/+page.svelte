<script lang="ts">
    import {Register, Section} from "flowbite-svelte-blocks";
    import {Alert, Button, Checkbox, Input, Label} from "flowbite-svelte";
    import CircleMinusOutline from "flowbite-svelte-icons/CircleMinusOutline.svelte";
    import type {ActionData} from './$types';
    import toast from "svelte-hot-french-toast";
    import {enhance} from "$app/forms";
    import PocketBase from "pocketbase";
    import {pbURL} from "$globals";
    import {Collections, type TypedPocketBase} from "$lib/pocketbase-types";
    import {goto} from "$app/navigation";

    export let form: ActionData;

    const pb = new PocketBase(pbURL) as TypedPocketBase;

    const submitLogin = () => {
        const toastId = toast.loading('Logging in...')
        // @ts-ignore
        return async ({result, update}) => {
            switch (result.type) {
                case 'redirect':
                    await update();
                    toast.success('Logged in successfully', {id: toastId});
                    break;
                case 'error':
                    toast.error(result.error.message, {id: toastId});
                    break;
                default:
                    await update();
            }
        };
    };

    function submitGoogleLogin() {
        pb.collection(Collections.Users).authWithOAuth2({"provider": "google"});
    }

    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
        goto("/app");
    });
</script>

<Section name="login">
    <Register href="/">
        <svelte:fragment slot="top">
            <img alt="Srello Logo" class="w-8 h-8 mr-2" src="/srello.svg"/>
            Srello
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form action="?/login" class="flex flex-col space-y-6" method="POST" use:enhance={submitLogin}>
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Log in</h3>
                <Label class="space-y-2">
                    <span>Your email</span>
                    <Input autocomplete="email" name="email" placeholder="name@company.com" required type="email"/>
                </Label>
                <Label class="space-y-2">
                    <span>Your password</span>
                    <Input autocomplete="current-password" name="password" placeholder="•••••" required
                           type="password"/>
                </Label>
                <div class="flex items-start">
                    <Checkbox>Remember me</Checkbox>
                    <a class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" href="/forgot">
                        Forgot password?
                    </a>
                </div>
                <Button type="submit">Sign in</Button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?
                    <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/register">
                        Sign up
                    </a>
                </p>
                {#if form?.notVerified}
                    <Alert color="red">
                        <CircleMinusOutline slot="icon" class="w-5 h-5"/>
                        <span class="font-medium">Your email is not verified.</span>
                        Please check your email inbox or spam folder for the verification email.
                    </Alert>
                {/if}
            </form>
            <Button color="alternative" class="w-full" on:click={submitGoogleLogin}>
                <img alt="Google Logo" class="mr-3 h-6 sm:h-9" src="/google-icon.svg"/>
                Sign in with Google
            </Button>
        </div>
    </Register>
</Section>