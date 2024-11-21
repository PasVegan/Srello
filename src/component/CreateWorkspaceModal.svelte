<script lang="ts">
    import {Button, Input, Label, Modal} from 'svelte-5-ui-lib';
    import toast from "svelte-hot-french-toast";
    import {enhance} from "$app/forms";


    interface Props {
        modalHelpers: { isOpen: boolean, toggle: () => void, close: () => void, open: () => void }
    }

    let {modalHelpers = $bindable()}: Props = $props();
    let modalStatus = $state(false);
    const closeModal = modalHelpers.close;
    $effect(() => {
        modalStatus = modalHelpers.isOpen;
    });

    const submitCreateWorkspace = () => {
        const toastId = toast.loading('Creating...')
        // @ts-ignore
        return async ({result, update}) => {
            switch (result.type) {
                case 'redirect':
                    await update();
                    toast.success('Workspace created successfully', {id: toastId});
                    break;
                case 'error':
                    toast.error(result.error.message, {id: toastId});
                    break;
                default:
                    await update();
            }
        };
    };
</script>

<Modal class="w-full" {closeModal} {modalStatus} size="xs">
    <form action="/app/createWorkspace" class="flex flex-col space-y-6" method="POST"
          use:enhance={submitCreateWorkspace}>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a new workspace</h3>
        <Label class="space-y-2">
            <span>Workspace name</span>
            <Input name="name" placeholder="MyWorkspace" required type="text"/>
        </Label>
        <Label class="space-y-2">
            <span>Workspace description</span>
            <Input name="description" placeholder="Our team organize everything here." type="text"/>
        </Label>
        <Button class="w-full1" onclick={closeModal} type="submit">Create</Button>
    </form>
</Modal>
