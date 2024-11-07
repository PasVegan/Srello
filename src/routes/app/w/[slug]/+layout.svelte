<script lang="ts">
    import {CloseButton, Sidebar, SidebarGroup, SidebarItem} from 'svelte-5-ui-lib';
    import {UserOutline, CogOutline} from "flowbite-svelte-icons";
    import type { LayoutData } from './$types';
    import { page } from "$app/stores";

    const spanClass = "flex-1 ms-3 whitespace-nowrap";

    let sidebarUiStatus = $state(true);
    const closeSidebarUi = () => {
        console.log('closeSidebarUi');
        sidebarUiStatus = false;
    }
    const openSidebarUi = () => {
        console.log('openSidebarUi');
        sidebarUiStatus = true;
    }

    interface Props {
        children?: import('svelte').Snippet;
        data: LayoutData;
    }
    let {children, data}: Props = $props();
</script>


<div class="flex h-full relative">
    {#if sidebarUiStatus === true}
        <Sidebar backdrop={false} activateClickOutside={false} params={{ x: -50, duration: 50 }}
                 class="relative h-full" activeClass="p-2" nonActiveClass="p-2">
            <div class="flex justify-between items-center w-full">
                <span class="text-lg font-semibold text-gray-900 dark:text-gray-200">{data.props.workspace.name}</span>
                <CloseButton onclick={closeSidebarUi} color="red"/>
            </div>

            <SidebarGroup border={true}>
                <SidebarItem label="Boards" {spanClass} href="/app/w/{$page.params.slug}">
                    {#snippet iconSlot()}
                        <svg class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z" fill="currentColor"></path></svg>
                    {/snippet}
                </SidebarItem>
                <SidebarItem label="Members" {spanClass} href="/app/w/{$page.params.slug}/members">
                    {#snippet iconSlot()}
                        <UserOutline
                                class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                    {/snippet}
                </SidebarItem>
                <SidebarItem label="Workspace settings" href="/app/w/{$page.params.slug}/settings">
                    {#snippet iconSlot()}
                        <CogOutline
                                class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                    {/snippet}
                </SidebarItem>
            </SidebarGroup>
        </Sidebar>
    {:else}
        <button onclick={openSidebarUi}
                class="relative text-center font-medium text-white bg-gray-200 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 group w-4"
                aria-label="Open sidebar">
        <span class="absolute right-0 top-3 translate-x-1/2">
            <svg class="w-6 h-6 rounded-full  bg-gray-300 group-hover:bg-gray-900 dark:bg-gray-700 dark:group-hover:bg-gray-600"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor"
                      stroke-width="0.1"
                      fill="currentColor"
                      d="M10.294 9.69805C10.2008 9.60614 10.1268 9.49661 10.0763 9.37584C10.0258 9.25507 9.99976 9.12546 9.99976 8.99455C9.99976 8.86364 10.0258 8.73403 10.0763 8.61327C10.1268 8.4925 10.2008 8.38297 10.294 8.29105C10.4831 8.10449 10.738 7.99988 11.0035 7.99988C11.2691 7.99988 11.524 8.10449 11.713 8.29105L14.678 11.2311C14.7802 11.3324 14.8614 11.453 14.9167 11.5858C14.9721 11.7186 15.0006 11.8611 15.0006 12.0051C15.0006 12.149 14.9721 12.2915 14.9167 12.4243C14.8614 12.5572 14.7802 12.6777 14.678 12.7791L11.723 15.7091C11.534 15.8959 11.2789 16.0007 11.013 16.0007C10.7472 16.0007 10.4921 15.8959 10.303 15.7091C10.2098 15.6171 10.1358 15.5076 10.0853 15.3868C10.0348 15.2661 10.0088 15.1365 10.0088 15.0056C10.0088 14.8746 10.0348 14.745 10.0853 14.6243C10.1358 14.5035 10.2098 14.394 10.303 14.3021L12.621 12.0051L10.294 9.69805V9.69805">
                </path>
            </svg>
        </span>
        </button>
    {/if}
    <div class="flex-1">
        {@render children?.()}
    </div>
</div>