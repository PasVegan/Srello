<script lang="ts">
    import {Avatar, Badge, Button, Card, Input, Modal, Search} from 'svelte-5-ui-lib';
    import UserAddOutline from 'flowbite-svelte-icons/UserAddOutline.svelte'
    import type {PageData} from './$types';
    import toast from "svelte-hot-french-toast"
    import {enhance} from "$app/forms";

    let showInviteModal = $state(false);
    let filterValue = $state('');
    let emailInput = $state('');

    interface Props {
        data: PageData;
    }

    let {data}: Props = $props();

    const toggleInviteModal = () => {
        showInviteModal = !showInviteModal;
    };

    const submitInvite = () => {
        const toastId = toast.loading('Inviting...')
        // @ts-ignore
        return async ({result, update}) => {
            switch (result.type) {
                case 'error':
                    toast.error(result.error.message, {id: toastId});
                    break;
                default:
                    await update();
                    toast.success('Invited successfully', {id: toastId});
                    break;
            }
        };
    };

    const submitDelete = () => {
        const toastId = toast.loading('Deleting...')
        // @ts-ignore
        return async ({result, update}) => {
            switch (result.type) {
                case 'error':
                    toast.error(result.error.message, {id: toastId});
                    break;
                default:
                    await update();
                    toast.success('Deleted successfully', {id: toastId});
                    break;
            }
        };
    };

</script>

<div class="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
    <Card class="w-full max-w-none shadow-xl" color="gray">
        <!-- Header Section -->
        <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <img
                            alt="Workspace logo"
                            class="w-20 h-20 rounded-lg object-cover"
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.props.workspace.name}`}
                    />
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{data.props.workspace.name}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Manage your team members</p>
                    </div>
                </div>
                <Button
                        class="w-full md:w-auto"
                        color="primary"
                        onclick={toggleInviteModal}
                        size="lg"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                              stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
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
                    <Badge class="text-xs" color="primary">
                        {data.props.members.length}
                    </Badge>
                </div>
                <Search
                        bind:value={filterValue}

                        placeholder="Search members..."
                        size="md"
                />
            </div>

            <div class="space-y-3">
                {#each (data.props.members ?? []).filter(m => m.name.toLowerCase().includes(filterValue.toLowerCase())) as member}
                    <div class="flex flex-col md:flex-row justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                        <div class="flex items-center gap-4 min-w-0">
                            <Avatar src={member.avatar} alt={member.name} size="xl"
                                    class="ring-2 ring-primary-100 dark:ring-primary-900 flex-shrink-0"/>
                            <div class="min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <p class="font-semibold text-gray-900 dark:text-white truncate">{member.name}</p>
                                    <Badge color="primary" class="text-xs">Admin</Badge>
                                </div>
                                <p class="text-sm text-gray-500 truncate">{member.email}</p>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                                    <p class="text-xs text-gray-400">Just now</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 mt-4 md:mt-0 flex-shrink-0">
                            <Button size="sm" color="gray" class="!px-3">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                </svg>
                            </Button>
                            <form method="POST" action="?/deleteMember&id={member.id}" use:enhance={submitDelete}>
                                <button class="text-center font-medium inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900 px-4 py-2 text-sm focus-within:ring-4 focus-within:outline-none border border-gray-300 dark:border-gray-400 rounded-lg whitespace-nowrap">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    Remove
                                </button>
                            </form>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>

    <!-- Invite Modal -->
    <Modal
            closeModal={toggleInviteModal}
            modalStatus={showInviteModal}
            size="lg"
            title="Invite Members to Workspace"
    >
        <div class="p-6">
            <div class="space-y-6">
                <form action="?/addMember" method="POST" use:enhance={submitInvite}>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="emailInput">
                        Invite via email
                    </label>
                    <Input
                            bind:value={emailInput}
                            name="email"
                            placeholder="Enter email address"
                            size="lg"
                            type="email"
                    />
                    <button class="text-center font-medium inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 px-5 py-2.5 text-sm focus-within:ring-4 focus-within:outline-none rounded-lg w-full mt-6">
                        <UserAddOutline/>
                        Invite
                    </button>
                </form>
            </div>
        </div>
    </Modal>
</div>