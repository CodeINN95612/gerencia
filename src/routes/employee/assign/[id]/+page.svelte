<script lang="ts">
    import { Difficulties } from "$lib/Enums/Difficulty";
    import { Priorities } from "$lib/Enums/Priority";
    import { validate_each_argument } from "svelte/internal";

    export let data: any;

    let { assignedActivity, employees } = data;
    let difficulties = [...Difficulties];
    let priorities = [...Priorities];

    export let form: any;
</script>

<svelte:head>
    <title>Assign Activity</title>
</svelte:head>
<h2>Assign Activity</h2>
<br />

<form action="?/createOrUpdate" method="POST" class="mt-3 d-flex flex-column">
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
    <label for="priority">Priority:</label>
    <select
        name="priority"
        id="priority"
        bind:value={assignedActivity.priority}
        required
    >
        {#each priorities as priority}
            <option value={priority.value}>{priority.name}</option>
        {/each}
    </select>
    <label for="assignedTo">Assigned To:</label>
    <select
        name="assignedTo"
        id="assignedTo"
        bind:value={assignedActivity.assignedToId}
        required
    >
        {#each employees as employee}
            <option value={employee.id}>{employee.name}</option>
        {/each}
    </select>
    <label for="hours">Estimated Hours:</label>
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
        required
        bind:value={assignedActivity.maxDate}
    />
    <br />
    <div class="d-flex">
        {#if assignedActivity.id}
            <input type="submit" value="Create" class="btn btn-primary" />
        {:else}
            <input type="submit" value="Update" class="btn btn-primary" />
        {/if}
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
