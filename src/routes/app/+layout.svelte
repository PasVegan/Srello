<script lang="ts">
    import { Button, Navbar, NavUl, NavLi, uiHelpers, NavHamburger, Dropdown, DropdownHeader, DropdownUl, DropdownLi, Avatar, DropdownFooter } from 'svelte-5-ui-lib';
    import { sineIn } from "svelte/easing";
    import type { LayoutData } from './$types';
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
<Navbar {navStatus} hamburgerMenu={false}>
    <NavUl class="dark:bg-gray-900">
        <NavLi href="/app" aClass="flex gap-2">
            <img width="30" src="/srello.svg" alt="Srello logo" />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Srello</h1>
        </NavLi>
        <NavLi onclick={dropdownWorkspace.toggle} class="cursor-pointer place-self-center">Workspaces</NavLi>
        <div class="relative place-self-center">
            <Dropdown dropdownStatus={dropdownWorkspaceStatus} closeDropdown={closeDropdownWorkspace} params={{ y: 0, duration: 200, easing: sineIn }} class="absolute -left-[110px] top-[14px] md:-left-[120px] w-auto">
                <DropdownUl class="w-auto">
                    <span class="block text-sm text-gray-900 dark:text-gray-400 mb-2 px-2">Your Workspaces:</span>
                    {#each data.props.workspaces as workspace}
                        <DropdownLi href="/app/w/{workspace.id}" aClass="pl-6 text-base w-auto" activeClass=" text-base w-auto" liClass="w-auto">{workspace.name}</DropdownLi>
                    {/each}
                </DropdownUl>
            </Dropdown>
        </div>
    </NavUl>
    {#snippet navSlotBlock()}
        <div class="flex items-center space-x-1 md:order-2">
            <Button size="sm">Create</Button>
            <Avatar onclick={dropdownUser.toggle} src={data.props.user.avatar} dot={{ color: "green" }} />
            <div class="relative">
                <Dropdown dropdownStatus={dropdownUserStatus} closeDropdown={closeDropdownUser} params={{ y: 0, duration: 200, easing: sineIn }} class="absolute -left-[110px] top-[14px] md:-left-[160px] w-auto">
                    <DropdownHeader class="px-4 py-2">
                        <span class="block text-sm text-gray-900 dark:text-white">{data.props.user.name}</span>
                        <span class="block text-sm font-medium">{data.props.user.email}</span>
                    </DropdownHeader>
                    <DropdownUl>
                        <DropdownLi href="/app/profile">Profile</DropdownLi>
                        <DropdownLi liClass="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <button onclick={createWorkspaceModalHelpers.open}>Create Workspace</button>
                        </DropdownLi>
                    </DropdownUl>
                    <DropdownFooter class="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</DropdownFooter>
                </Dropdown>
            </div>
            <NavHamburger {toggleNav} />
        </div>
    {/snippet}
</Navbar>
<CreateWorkspaceModal modalHelpers={createWorkspaceModalHelpers}></CreateWorkspaceModal>
<div class="flex-1">
    {@render children?.()}
</div>
</div>