<script lang="ts">
    import {Section, Register} from "flowbite-svelte-blocks";
    import {Button, Checkbox, Label, Input, Alert} from "flowbite-svelte";
    import CircleMinusOutline from "flowbite-svelte-icons/CircleMinusOutline.svelte";
    import type {ActionData} from './$types';

    export let form: ActionData;
</script>

<Section name="login">
    <Register href="/">
        <svelte:fragment slot="top">
            <img class="w-8 h-8 mr-2" src="/srello.svg" alt="Srello Logo"/>
            Srello
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" action="?/login" method="POST">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Log in</h3>
                <Label class="space-y-2">
                    <span>Your email</span>
                    <Input type="email" name="email" placeholder="name@company.com" required autocomplete="email"/>
                </Label>
                <Label class="space-y-2">
                    <span>Your password</span>
                    <Input type="password" name="password" placeholder="•••••" required autocomplete="current-password"/>
                </Label>
                <div class="flex items-start">
                    <Checkbox>Remember me</Checkbox>
                    <a href="/forgot" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                        Forgot password?
                    </a>
                </div>
                <Button type="submit" class="w-full1">Sign in</Button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?
                    <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Sign up
                    </a>
                </p>
                {#if form?.notVerified}
                    <Alert color="red">
                        <CircleMinusOutline slot="icon" class="w-5 h-5" />
                        <span class="font-medium">Your email is not verified.</span>
                        Please check your email inbox or spam folder for the verification email.
                    </Alert>
                {/if}
            </form>
        </div>
    </Register>
</Section>