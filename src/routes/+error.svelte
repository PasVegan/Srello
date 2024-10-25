<script lang="ts">
    import {page} from '$app/stores';
    import Section from 'flowbite-svelte-blocks/Section.svelte';
    import Page404 from 'flowbite-svelte-blocks/Page404.svelte';
    import Page500 from 'flowbite-svelte-blocks/Page500.svelte';
    import Button from 'flowbite-svelte/Button.svelte';
</script>

{#if $page.status === 404}
    <Section name="page404">
        <Page404>
            {#snippet h1()}
                404
            {/snippet}
            {#snippet paragraph()}

                <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's
                    missing.</p>
                <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page.
                    You'll find lots to explore on the home page.</p>
                <Button href="/" size="lg" color="red">Back to Homepage</Button>

            {/snippet}
        </Page404>
    </Section>
{:else if $page.status === 500}
    <Section name="page500">
        <Page500>
            {#snippet h1()}
                500
            {/snippet}
            {#snippet paragraph()}

                <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Internal
                    Server Error.</p>
                <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">We are already working to solve the
                    problem.</p>

            {/snippet}
        </Page500>
    </Section>
{:else}
    <h1>{$page.status}: {$page.error != null ? $page.error.message : 'Unknown error'}</h1>
{/if}