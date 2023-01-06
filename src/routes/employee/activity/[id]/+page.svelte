<script lang="ts">
    import { Difficulties } from "$lib/Enums/Difficulty";

    export let data: any;

    let assignedActivity = data.assignedActivity;
    let difficulties = [...Difficulties];

    export let form: any;
</script>

<svelte:head>
    <title>Activity</title>
</svelte:head>
<h2>Activity</h2>
<br />

<form action="?/create" method="POST" class="mt-3 d-flex flex-column">
    <label for="name">Name:</label>
    <input
        type="text"
        name="name"
        id="name"
        bind:value={assignedActivity.name}
        required
    />
    <label for="description">Description:</label>
    <textarea
        name="description"
        id="description"
        bind:value={assignedActivity.description}
        required
    />
    <label for="difficulty">Difficulty:</label>
    <select
        name="difficulty"
        id="difficulty"
        bind:value={assignedActivity.difficulty}
        required
    >
        {#each difficulties as difficulty}
            <option value={difficulty.value}>{difficulty.name}</option>
        {/each}
    </select>
    <label for="hours">Hours:</label>
    <input
        type="number"
        name="hours"
        id="hours"
        bind:value={assignedActivity.estimatedHours}
        required
    />
    <label for="maxDate">Max Date:</label>
    <input
        type="datetime-local"
        name="maxDate"
        id="maxDate"
        bind:value={assignedActivity.maxDate}
        required
    />
    <div class="row">
        <label for="completed" class="col-auto">Completed: </label>
        <input
            type="checkbox"
            name="completed"
            id="completed"
            class="col-auto"
            bind:checked={assignedActivity.completed}
        />
    </div>
    <br />
    <div class="d-flex">
        <input type="submit" value="Create" class="btn btn-primary" />
    </div>
    {#if form?.missing}
        <div class="alert alert-danger">You must fill all the form</div>
    {/if}
    {#if form?.is_error}
        <div class="alert alert-danger">
            Server Error: {form?.error}
        </div>
    {/if}
</form>
