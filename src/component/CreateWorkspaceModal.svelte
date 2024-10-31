<script lang="ts">
    import { Button, Modal, Label, Input} from 'svelte-5-ui-lib';

    interface Props {
        modalHelpers: {isOpen: boolean, toggle: () => void, close: () => void, open: () => void}
    }

    let {modalHelpers = $bindable()}: Props = $props();
    let modalStatus = $state(false);
    const closeModal = modalHelpers.close;
    $effect(() => {
        modalStatus = modalHelpers.isOpen;
    });
</script>

<Modal {modalStatus} {closeModal} size="xs" class="w-full">
    <form class="flex flex-col space-y-6" method="POST" action="/app/createWorkspace">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a new workspace</h3>
        <Label class="space-y-2">
            <span>Workspace name</span>
            <Input type="text" name="name" placeholder="MyWorkspace" required/>
        </Label>
        <Label class="space-y-2">
            <span>Workspace description</span>
            <Input type="text" name="description" placeholder="Our team organize everything here."/>
        </Label>
        <Button type="submit" class="w-full1" onclick={closeModal}>Create</Button>
    </form>
</Modal>
