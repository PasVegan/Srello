<script lang="ts">
    import "../app.css";
    import {Toaster} from "svelte-hot-french-toast"

    interface Props {
        children?: import('svelte').Snippet;
    }

    let {children}: Props = $props();
</script>

<Toaster position="bottom-end"/>

{@render children?.()}