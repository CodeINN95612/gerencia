<script lang="ts">
    import type { ActionData } from "./$types";

    export let data: any;
    const roles = data.roles;
    let employee = data.employee;
    let companyRole = data.role;

    export let form: ActionData;
</script>

<h2>Employee</h2>
<form action="?/createOrUpdate" method="POST">
    <div class="personal-data">
        <h3>Personal Data</h3>

        <label for="firstname">First Name:</label>
        <input
            type="text"
            name="firstname"
            id="firstname"
            bind:value={employee.firstName}
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

        <label for="phone">Phone #:</label>
        <input
            type="tel"
            name="phone"
            id="phone"
            bind:value={employee.phone}
            required
        />

        <label for="mobilephone">Mobile Phone #:</label>
        <input
            type="tel"
            name="mobilephone"
            id="mobilephone"
            bind:value={employee.mobilePhone}
            required
        />

        <label for="email">E-mail:</label>
        <input
            type="email"
            name="email"
            id="email"
            bind:value={employee.email}
            required
        />

        <label for="address">Address:</label>
        <input
            type="text"
            name="address"
            id="address"
            bind:value={employee.addres}
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
            bind:value={employee.user.username}
            required
        />

        <label for="password">Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            bind:value={employee.user.password}
            required
        />

        <label for="role">Role:</label>
        <select name="role" id="role" bind:value={companyRole.id} required>
            {#each roles as role}
                <option value={role.id}>{role.name}</option>
            {/each}
        </select>

        <input type="submit" value="Done" class="btn btn-primary" />
        {#if form?.missing}
            <div class="alert alert-danger">
                Faltan llenar campos obligatorios
            </div>
        {/if}
        {#if form?.is_error}
            <div class="alert alert-danger">
                Error de servidor: {form?.error}
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

    .personal-data {
        display: grid;
    }

    .user-data > label {
        padding-top: 5px;
    }

    .user-data > .btn {
        margin-block: 25px;
    }
</style>
