<script lang="ts">
    import { Card, Avatar, Button, Modal, Alert, Input, Badge, Search } from 'svelte-5-ui-lib';
    import { slide } from 'svelte/transition';
    import type { PageData } from './$types';
    import type {UsersResponse} from "$lib/pocketbase-types";

    let showInviteModal = $state(false);
    let showAlert = $state(false);
    let filterValue = $state('');
    let emailInput = $state('');

    interface Props {
        data: PageData;
    }

    let {data}: Props = $props();

    const toggleInviteModal = () => {
        showInviteModal = !showInviteModal;
    };

    const handleInviteWithLink = () => {
        showAlert = true;
        setTimeout(() => showAlert = false, 3000);
    };

    const handleRemoveMember = (member: UsersResponse) => {
        console.log(`Removing member: ${member.name}`);
    };

</script>

<div class="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
    {#if showAlert}
        <Alert
                transition={slide}
                color="green"
                class="fixed top-4 right-4 z-50 shadow-lg"
                dismissable
        >
            <span class="font-medium">Success!</span> Invite link has been copied to your clipboard.
        </Alert>
    {/if}

    <Card class="w-full max-w-none shadow-xl" color="gray">
        <!-- Header Section -->
        <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                        <img
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.props.workspace.name}`}
                                alt="Workspace logo"
                                class="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{data.props.workspace.name}</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Manage your team members</p>
                        </div>
                </div>
                <Button
                        color="primary"
                        onclick={toggleInviteModal}
                        class="w-full md:w-auto"
                        size="lg"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Invite Members
                </Button>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="p-6">
            <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
                    <Badge color="primary" class="text-xs">
                        {data.props.workspace.members.length}
                    </Badge>
                </div>
                <Search
                        bind:value={filterValue}
                        placeholder="Search members..."
                        size="md"
                        class="w-full md:w-72"
                />
            </div>

            <div class="space-y-3">
                {#each (data.props.workspace?.expand?.users_via_workspaces ?? []).filter(m => m.name.toLowerCase().includes(filterValue.toLowerCase())) as member}
                    <div class="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200 gap-4">
                        <div class="flex items-center gap-4">
                            <Avatar src={member.avatar} alt={member.name} size="xl" class="ring-2 ring-primary-100 dark:ring-primary-900" />
                            <div>
                                <div class="flex items-center gap-2">
                                    <p class="font-semibold text-gray-900 dark:text-white">{member.name}</p>
                                        <Badge color="primary" class="text-xs">Admin</Badge>
                                </div>
                                <p class="text-sm text-gray-500">{member.email}</p>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="w-2 h-2 rounded-full bg-gray-400"></span>
                                    <p class="text-xs text-gray-400">Just now</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <Button size="sm" color="gray" class="!px-3">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </Button>
                            <Button size="sm" color="red" outline={true} onclick={() => handleRemoveMember(member)}>
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                            </Button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>

    <!-- Invite Modal -->
    <Modal
            modalStatus={showInviteModal}
            size="lg"
            closeModal={toggleInviteModal}
            title="Invite Members to Workspace"
    >
        <div class="p-6">
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="emailInput">
                        Invite via email
                    </label>
                    <Input
                            id="emailInput"
                            bind:value={emailInput}
                            type="email"
                            placeholder="Enter email addresses (comma separated)"
                            size="lg"
                    />
                    <p class="mt-2 text-sm text-gray-500">
                        Enter multiple emails separated by commas
                    </p>
                </div>

                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">or</span>
                    </div>
                </div>

                <Button
                        class="w-full"
                        color="gray"
                        onclick={handleInviteWithLink}
                >
                    <div class="flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Generate Invite Link</span>
                    </div>
                </Button>
            </div>
        </div>
    </Modal>
</div>