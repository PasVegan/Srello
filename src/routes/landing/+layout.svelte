<script lang="ts">
    import {Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl} from 'flowbite-svelte';
    import {page} from '$app/stores';

    interface Props {
        children?: import('svelte').Snippet;
    }

    let {children}: Props = $props();
</script>

<header>
    <Navbar class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800" fluid={false} let:hidden let:toggle>
        <NavBrand href="/landing">
            <img alt="Srello Logo" class="mr-3 h-6 sm:h-9" src="/srello.svg"/>
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> Srello </span>
        </NavBrand>
        <div class="flex items-center lg:order-2">
            <Button color="dark" href="/login">Log in</Button>
            <Button class="ml-2" color="red" href="/register">Get started</Button>
            <NavHamburger
                    class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    on:click={toggle}/>
        </div>
        <NavUl activeUrl={$page.url.pathname}
               divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
               {hidden} ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <NavLi href="/landing">Home</NavLi>
            <NavLi href="/landing/#">Features</NavLi>
            <NavLi href="/landing/#">Team</NavLi>
            <NavLi href="/landing/#">Contact</NavLi>
        </NavUl>
    </Navbar>
</header>
<div>
    {@render children?.()}
</div>