<script lang="ts">
    import type { Employee } from "@prisma/client";
    import type { ActionData } from "./$types";

    export let data: any;
</script>

<svelte:head>
    <title>Employee</title>
</svelte:head>

<h2>Employees</h2>
{#if !data.employees || data.employees.length === 0}
    <p>No employees available</p>
    <a href="admin/employee/0" class="btn btn-primary mt-3">Create new</a>
{:else}
    <a href={`/admin/employee/0`} class="btn btn-primary my-3">New</a>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col" />
            </tr>
        </thead>
        <tbody>
            {#each data.employees as employee}
                <tr>
                    <td>{employee.name}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.username}</td>
                    <td>{employee.role}</td>
                    <td>
                        <a href={`/admin/employee/${employee.id}`}>edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
