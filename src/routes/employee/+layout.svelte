<script lang="ts">
    import Header from "./Header.svelte";
    export let data: any;
</script>

<Header canAssign={data.canAssign} />

<div class="container mt-3">
    <slot />
</div>
