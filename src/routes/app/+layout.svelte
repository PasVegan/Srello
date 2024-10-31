<script lang="ts">
    import { Button, Navbar, NavBrand, NavUl, NavLi, uiHelpers, NavHamburger, Dropdown, DropdownHeader, DropdownUl, DropdownLi, Avatar, DropdownFooter } from 'svelte-5-ui-lib';
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

    let currentWorkspace = $state(data.props.workspaces[0]);

    $effect(() => {
        dropdownUserStatus = dropdownUser.isOpen;
        dropdownWorkspaceStatus = dropdownWorkspace.isOpen;
        navStatus = nav.isOpen;
    });
</script>

<Navbar {navStatus} hamburgerMenu={false}>
    {#snippet brand()}
        <NavBrand siteName="Srello" href="/app">
            <img width="30" src="/srello.svg" alt="Srello logo" />
        </NavBrand>
    {/snippet}
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
    <NavUl class="order-1 dark:bg-gray-900">
        <NavLi onclick={dropdownWorkspace.toggle} class="cursor-pointer">Workspaces</NavLi>
        <div class="relative">
            <Dropdown dropdownStatus={dropdownWorkspaceStatus} closeDropdown={closeDropdownWorkspace} params={{ y: 0, duration: 200, easing: sineIn }} class="absolute -left-[110px] top-[14px] md:-left-[160px] w-auto">
                {#if data.props.workspaces.length > 1}
                    <DropdownHeader class="px-2 pt-2 pb-4 w-auto">
                        <span class="block text-sm text-gray-900 dark:text-gray-400 mb-4">Current Workspace:</span>
                        <span class="block text-base font-medium ml-4">{currentWorkspace.name}</span>
                    </DropdownHeader>
                {/if}
                <DropdownUl class="w-auto">
                    <span class="block text-sm text-gray-900 dark:text-gray-400 mb-2 px-2">Your Workspaces:</span>
                    {#each data.props.workspaces as workspace, id}
                        <DropdownLi onclick={() => {currentWorkspace = data.props.workspaces[id]}} href="/app/workspace/{workspace.id}" aClass="pl-6 text-base w-auto" liClass="w-auto">{workspace.name}</DropdownLi>
                    {/each}
                </DropdownUl>
            </Dropdown>
        </div>
    </NavUl>
</Navbar>
<CreateWorkspaceModal modalHelpers={createWorkspaceModalHelpers}></CreateWorkspaceModal>
{@render children?.()}
