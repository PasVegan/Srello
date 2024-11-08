<script lang="ts">
    import {Register, Section} from "flowbite-svelte-blocks";
    import {Alert, Button, Input, Label} from "flowbite-svelte";
    import CheckCircleOutline from "flowbite-svelte-icons/CheckCircleOutline.svelte";
    import ArrowLeftOutline from "flowbite-svelte-icons/ArrowLeftOutline.svelte";
    import type {ActionData} from './$types';

    export let form: ActionData;
</script>

<Section name="reset">
    <Button class="!p-2" href="/login" style="margin-right: 25.5rem">
        <ArrowLeftOutline class="w-6 h-6"/>
    </Button>
    <Register href="/">
        <svelte:fragment slot="top">
            <img alt="Srello Logo" class="w-8 h-8 mr-2" src="/srello.svg"/>
            Srello
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form action="?/forgot" class="flex flex-col space-y-6" method="POST">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Reset your password</h3>
                <Label class="space-y-2">
                    <span>Your email</span>
                    <Input name="email" placeholder="name@company.com" required type="email"/>
                </Label>
                <Button class="w-full1" type="submit">Reset password</Button>
            </form>
        </div>
        {#if form?.success}
            <Alert color="green">
                <CheckCircleOutline slot="icon" class="w-5 h-5"/>
                <span class="font-medium">Success!</span>
                If an account with that email exists, we have sent you an email to reset your password.
            </Alert>
        {/if}
    </Register>
</Section>