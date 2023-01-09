<script lang="ts">
    export let data: any;

    export let form: any;
    let role = data.role ?? {};
</script>

<svelte:head>
    <title>Role</title>
</svelte:head>

{#if role.name}
    <h2>{role.name}</h2>
{:else}
    <h2>New Role</h2>
{/if}

<form action="?/createOrUpdate" method="POST" class="mt-3 d-flex flex-column">
    <label for="name">Name:</label>
    <input type="text" name="name" id="name" bind:value={role.name} required />

    <label for="detail">Detail:</label>
    <textarea
        name="detail"
        id="detail"
        bind:value={role.description}
        required
        rows="5"
    />

    <div class="row">
        <label for="isAdmin" class="col-auto">Is Admin:</label>
        <input
            type="checkbox"
            name="isAdmin"
            class="col-auto"
            bind:checked={role.isAdmin}
        />
    </div>

    <input type="submit" value="Done" class="btn btn-primary mt-3" />
    {#if form?.missing}
        <div class="alert alert-danger">You must fill all the form</div>
    {/if}
    {#if form?.is_error}
        <div class="alert alert-danger">
            Server Error: {form?.error}
        </div>
    {/if}
</form>

<style>
    form {
        max-width: fit-content;
    }
</style>
