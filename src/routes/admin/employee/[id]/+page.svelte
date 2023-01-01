<script lang="ts">
    export let data: any;

    let { roles, contracts } = data.requirements ?? {
        roles: [],
        contracts: [],
    };
    let employee = data.employee;

    export let form: any;
</script>

<svelte:head>
    <title>Employee</title>
</svelte:head>

{#if employee.name}
    <h2>{employee.name}</h2>
{:else}
    <h2>New Employee</h2>
{/if}

<form action="?/createOrUpdate" method="POST" class="mt-3">
    <div class="personal-data d-flex flex-column">
        <h3>Personal Data</h3>

        <label for="firstname">First Name:</label>
        <input
            type="text"
            name="firstname"
            id="firstname"
            bind:value={employee.name}
            required
        />

        <label for="lastname">Last Name:</label>
        <input
            type="text"
            name="lastname"
            id="lastname"
            bind:value={employee.lastName}
            required
        />

        <label for="identification">Identification:</label>
        <input
            type="text"
            name="identification"
            id="identification"
            bind:value={employee.identification}
            required
        />
    </div>
    <div class="user-data d-flex flex-column">
        <h3>User Data</h3>

        <label for="username">Username:</label>
        <input
            type="text"
            name="username"
            id="username"
            bind:value={employee.username}
            required
        />

        <label for="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            bind:value={employee.password}
            required
        />

        <label for="role">Role:</label>
        <select name="role" id="role" bind:value={employee.roleId} required>
            {#each roles as role}
                <option value={role.id}>{role.name}</option>
            {/each}
        </select>

        <label for="contract">Contract:</label>
        <select
            name="contract"
            id="contract"
            bind:value={employee.contractId}
            required
        >
            {#each contracts as contract}
                <option value={contract.id}>{contract.name}</option>
            {/each}
        </select>

        <input type="submit" value="Done" class="btn btn-primary" />
        {#if form?.missing}
            <div class="alert alert-danger">You must fill all the form</div>
        {/if}
        {#if form?.is_error}
            <div class="alert alert-danger">
                Server Error: {form?.error}
            </div>
        {/if}
    </div>
</form>

<style>
    form {
        display: grid;
        gap: 100px;
        grid-template-columns: 1fr 1fr;
    }
    /* form > label,
    form > input {
        max-width: 250px;
    } */

    /* .personal-data {
        display: grid;
    } */

    .user-data > label {
        padding-top: 5px;
    }

    .user-data > .btn {
        margin-block: 25px;
    }
</style>
