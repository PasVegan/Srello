<script lang="ts">
    import {page} from '$app/stores';
</script>

{#if $page.status === 404}
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
        </h1>

        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page.
            You'll find lots to explore on the home page.</p>
        <a href="/" class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-3 text-base text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900 rounded-lg">Back to Homepage</a>
    </div>
{:else if $page.status === 500}
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            500
        </h1>

        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Internal Server Error.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            We are already working to solve the problem.
        </p>
        <a href="/" class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-3 text-base text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus-within:ring-red-300 dark:focus-within:ring-red-900 rounded-lg">Back to Homepage</a>
    </div>
{:else}
    <h1>{$page.status}: {$page.error != null ? $page.error.message : 'Unknown error'}</h1>
{/if}