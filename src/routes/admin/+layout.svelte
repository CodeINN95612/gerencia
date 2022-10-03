<script lang="ts">
    import Header from "$lib/components/common/Header.svelte";
    import Footer from "$lib/components/common/Footer.svelte";
</script>

<Header />

<div class="container-md">
    <slot />
</div>
