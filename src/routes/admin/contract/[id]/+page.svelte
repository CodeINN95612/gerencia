<script lang="ts">
    export let data: any;

    export let form: any;
    let contract = data.contract ?? {};
</script>

<svelte:head>
    <title>Contract</title>
</svelte:head>

{#if contract.name}
    <h2>{contract.name}</h2>
{:else}
    <h2>New Contract</h2>
{/if}

<form action="?/createOrUpdate" method="POST" class="mt-3 d-flex flex-column">
    <label for="name">Name:</label>
    <input
        type="text"
        name="name"
        id="name"
        bind:value={contract.name}
        required
    />

    <label for="detail">Detail:</label>
    <textarea
        name="detail"
        id="detail"
        bind:value={contract.description}
        required
        rows="5"
    />

    <label for="salary" class="col-auto">Salary:</label>
    <input
        type="number"
        step="0.1"
        name="salary"
        bind:value={contract.salary}
    />

    <label for="dailyHours" class="col-auto">Daily Hours:</label>
    <input
        type="number"
        step="1"
        name="dailyHours"
        bind:value={contract.dailyHours}
    />

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
