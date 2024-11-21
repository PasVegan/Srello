<script lang="ts">
    import {
        Avatar,
        Button,
        Dropdown,
        DropdownFooter,
        DropdownHeader,
        DropdownLi,
        DropdownUl,
        Navbar,
        NavHamburger,
        NavLi,
        NavUl,
        uiHelpers
    } from 'svelte-5-ui-lib';
    import {sineIn} from "svelte/easing";
    import AngleDownOutline from "flowbite-svelte-icons/AngleDownOutline.svelte";
    import type {LayoutData} from './$types';
    import CreateWorkspaceModal from "$components/CreateWorkspaceModal.svelte";

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

    let {data, children}: Props = $props();

    $effect(() => {
        dropdownUserStatus = dropdownUser.isOpen;
        dropdownWorkspaceStatus = dropdownWorkspace.isOpen;
        navStatus = nav.isOpen;
    });
</script>

<div class="h-screen flex flex-col">
    <Navbar hamburgerMenu={false} {navStatus}>
        <NavUl class="dark:bg-gray-900">
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
            <div class="flex items-center space-x-1 md:order-2">
                <Button size="sm">Create</Button>
                <Avatar onclick={dropdownUser.toggle} src={data.props.user.avatar} dot={{ color: "green" }}/>
                <div class="relative">
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