<script lang="ts">
    import {
        Avatar,
        Button,
        Dropdown,
        DropdownFooter,
        DropdownHeader,
        DropdownLi,
        DropdownUl,
        Indicator,
        Navbar,
        NavHamburger,
        NavLi,
        NavUl,
        uiHelpers
    } from 'svelte-5-ui-lib';
    import {page} from "$app/stores";
    import {sineIn} from "svelte/easing";
    import AngleDownOutline from "flowbite-svelte-icons/AngleDownOutline.svelte";
    import BellActiveOutline from "flowbite-svelte-icons/BellActiveOutline.svelte";
    import type {LayoutData} from './$types';
    import CreateWorkspaceModal from "$components/CreateWorkspaceModal.svelte";
    import {Collections} from "$lib/pocketbase-types";
    import {onDestroy} from "svelte";
    import {pb} from "$globals";

    interface Props {
        data: LayoutData
        children?: import('svelte').Snippet;
    }

    let nav = uiHelpers();
    let navStatus = $state(false);
    let toggleNav = nav.toggle;

    let dropdownUser = uiHelpers();
    let dropdownUserStatus = $state(false);
    let closeDropdownUser = dropdownUser.close;

    let dropdownWorkspace = uiHelpers();
    let dropdownWorkspaceStatus = $state(false);
    let closeDropdownWorkspace = dropdownWorkspace.close;

    const createWorkspaceModalHelpers = uiHelpers();

    let dropdownNotification = uiHelpers();
    let dropdownNotificationStatus = $state(false);
    let closeDropdownNotification = dropdownNotification.close;

    let activeUrl = $state($page.url.pathname);

    let {data, children}: Props = $props();

    interface Message {
        id: string;  // Added ID for deletion
        title: string;
        message: string;
    }

    let messages: Message[] = $state([]);
    let userWorkspace = $state(data.props.workspaces.map(workspace => workspace.id));

    pb.authStore.loadFromCookie(data.props.cookie);

    function deleteMessage(messageId: string) {
        messages = messages.filter(msg => msg.id !== messageId);
    }

    pb.collection(Collections.Users).subscribe(data.props.user.id, async function (e) {
        if (e.action === 'update') {
            const currentWorkspaces = new Set(userWorkspace);
            const updatedWorkspaces = new Set(e.record.workspaces);
            console.log(currentWorkspaces, updatedWorkspaces);

            // Find new workspaces (present in updated but not in current)
            const newWorkspaces = e.record.workspaces.filter(id => !currentWorkspaces.has(id));

            // Find removed workspaces (present in current but not in updated)
            const removedWorkspaces = [...currentWorkspaces].filter(id => !updatedWorkspaces.has(id));

            if (newWorkspaces.length > 0) {
                const newWorkspacesData = await pb.collection(Collections.Workspaces).getFullList({
                    filter: newWorkspaces.map((id) => `id="${id}"`).join("||"),
                    fields: 'name'
                });

                for (const workspace of newWorkspacesData) {
                    messages.push({
                        id: crypto.randomUUID(),
                        title: 'New Workspace',
                        message: `You have been added to the workspace "${workspace.name}"`
                    });
                }
            }

            if (removedWorkspaces.length > 0) {
                const removedWorkspacesData = await pb.collection(Collections.Workspaces).getFullList({
                    filter: removedWorkspaces.map((id) => `id="${id}"`).join("||"),
                    fields: 'name'
                });

                for (const workspace of removedWorkspacesData) {
                    messages.push({
                        id: crypto.randomUUID(),
                        title: 'Workspace Removed',
                        message: `You have been removed from the workspace "${workspace.name}"`
                    });
                }
            }

            // Update the state with a new workspace list
            userWorkspace = [...e.record.workspaces];
        }
    });

    onDestroy(() => {
        pb.collection(Collections.Users).unsubscribe(data.props.user.id);
    });

    $effect(() => {
        dropdownUserStatus = dropdownUser.isOpen;
        console.log(dropdownUserStatus);
        dropdownWorkspaceStatus = dropdownWorkspace.isOpen;
        navStatus = nav.isOpen;
        dropdownNotificationStatus = dropdownNotification.isOpen;
        activeUrl = $page.url.pathname;
    });
</script>

<div class="h-screen flex flex-col">
    <Navbar {navStatus} hamburgerMenu={false}>
        <NavUl activeUrl={activeUrl} class="dark:bg-gray-900">
            <NavLi aClass="flex gap-2" href="/app">
                <img alt="Srello logo" src="/srello.svg" width="30"/>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Srello</h1>
            </NavLi>
            <NavLi class="cursor-pointer place-self-center" onclick={dropdownWorkspace.toggle}>
                <div class="flex gap-2">
                    Workspaces
                    <AngleDownOutline></AngleDownOutline>
                </div>
            </NavLi>
            <div class="relative place-self-center" style="z-index: 60;">
                <Dropdown class="absolute right-0 top-[14px] w-48 z-50" closeDropdown={closeDropdownWorkspace}
                          dropdownStatus={dropdownWorkspaceStatus}
                          params={{ y: 0, duration: 200, easing: sineIn }}>
                    <DropdownUl class="w-auto z-50">
                        <span class="block text-sm text-gray-900 dark:text-gray-400 mb-2 px-2 z-50">Your Workspaces:</span>
                        {#each data.props.workspaces as workspace}
                            <DropdownLi href="/app/w/{workspace.id}" aClass="pl-6 text-base w-auto"
                                        activeClass=" text-base w-auto" liClass="w-auto">{workspace.name}</DropdownLi>
                        {/each}
                    </DropdownUl>
                </Dropdown>
            </div>
        </NavUl>
        {#snippet navSlotBlock()}
            <div class="flex items-center space-x-3 md:order-2">
                <Button size="sm">Create</Button>
                <div class="relative cursor-pointer">
                    <BellActiveOutline size="lg" onclick={dropdownNotification.toggle}/>
                    {#if messages.length > 0}
                        <Indicator color="red" border size="md" placement="top-right"/>
                    {/if}
                </div>
                <div class="relative" style="z-index: 60;">
                    <Dropdown
                            dropdownStatus={dropdownNotificationStatus}
                            closeDropdown={closeDropdownNotification}
                            params={{ y: 0, duration: 200, easing: sineIn }}
                            class="absolute right-0 top-[14px] w-[300px] max-w-[calc(100vw-45rem)] z-50"
                            style="z-index: 100 !important; transform: translateX(calc(50% - 24px));"
                    >
                        <DropdownHeader class="px-4 py-2">
                            <span class="block text-lg font-semibold text-gray-900 dark:text-white">Notifications</span>
                        </DropdownHeader>
                        <DropdownUl>
                            {#if messages.length === 0}
                                <DropdownLi liClass="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                    No new notifications
                                </DropdownLi>
                            {:else}
                                {#each messages as message}
                                    <DropdownLi liClass="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <div class="flex justify-between items-start gap-2">
                                            <div class="flex flex-col gap-1 flex-1 min-w-0">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white break-words">
                                    {message.title}
                                </span>
                                                <span class="text-sm text-gray-500 dark:text-gray-400 break-words">
                                    {message.message}
                                </span>
                                            </div>
                                            <button
                                                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                                                    onclick={() => deleteMessage(message.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </DropdownLi>
                                {/each}
                            {/if}
                        </DropdownUl>
                    </Dropdown>
                </div>
                <Avatar onclick={dropdownUser.toggle} src={data.props.user.avatar} dot={{ color: "green" }}/>
                <div class="relative place-self-center" style="z-index: 60;">
                    <Dropdown dropdownStatus={dropdownUserStatus} closeDropdown={closeDropdownUser}
                              params={{ y: 0, duration: 200, easing: sineIn }}
                              class="absolute right-0 top-[14px] min-w-[240px] z-50"
                              style="z-index: 100 !important;">
                        <DropdownHeader class="px-4 py-2">
                            <span class="block text-sm text-gray-900 dark:text-white break-words">{data.props.user.name}</span>
                            <span class="block text-sm font-medium break-words">{data.props.user.email}</span>
                        </DropdownHeader>
                        <DropdownUl>
                            <DropdownLi href="/app/profile">Profile</DropdownLi>
                            <DropdownLi
                                    liClass="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <button onclick={createWorkspaceModalHelpers.open}>Create Workspace</button>
                            </DropdownLi>
                        </DropdownUl>
                        <DropdownFooter class="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                            <form method="post" action="/logout">
                                <button type="submit">Logout</button>
                            </form>
                        </DropdownFooter>
                    </Dropdown>
                </div>
                <NavHamburger {toggleNav}/>
            </div>
        {/snippet}
    </Navbar>
    <CreateWorkspaceModal modalHelpers={createWorkspaceModalHelpers}></CreateWorkspaceModal>
    <div class="flex-1">
        {@render children?.()}
    </div>
</div>