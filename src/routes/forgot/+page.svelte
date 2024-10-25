<script lang="ts">
    import {Section, Register} from "flowbite-svelte-blocks";
    import {Button, Label, Input, Alert} from "flowbite-svelte";
    import CheckCircleOutline from "flowbite-svelte-icons/CheckCircleOutline.svelte";
    import ArrowLeftOutline from "flowbite-svelte-icons/ArrowLeftOutline.svelte";
    import type {ActionData} from './$types';

    export let form: ActionData;
</script>

<Section name="reset">
    <Button class="!p-2" style="margin-right: 25.5rem" href="/login"><ArrowLeftOutline class="w-6 h-6" /></Button>
    <Register href="/">
        <svelte:fragment slot="top">
            <img class="w-8 h-8 mr-2" src="/srello.svg" alt="Srello Logo"/>
            Srello
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" action="?/forgot" method="POST">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Reset your password</h3>
                <Label class="space-y-2">
                    <span>Your email</span>
                    <Input type="email" name="email" placeholder="name@company.com" required/>
                </Label>
                <Button type="submit" class="w-full1">Reset password</Button>
            </form>
        </div>
        {#if form?.success}
            <Alert color="green">
                <CheckCircleOutline slot="icon" class="w-5 h-5" />
                <span class="font-medium">Success!</span>
                If an account with that email exists, we have sent you an email to reset your password.
            </Alert>
        {/if}
    </Register>
</Section>