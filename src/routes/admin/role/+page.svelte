<script lang="ts">
    import type { ActionData } from "./$types";

    export let data: any;
</script>

<svelte:head>
    <title>Role</title>
</svelte:head>

<h2>Roles</h2>
{#if !data.roles || data.roles.length === 0}
    <p>No roles available</p>
    <a href="admin/role/0" class="btn btn-primary mt-3">Create new</a>
{:else}
    <a href={`/admin/role/0`} class="btn btn-primary my-3">New</a>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Admin</th>
                <th scope="col" />
            </tr>
        </thead>
        <tbody>
            {#each data.roles as role}
                <tr>
                    <td>{role.name}</td>
                    <td>{role.isAdmin ? "Yes" : "No"}</td>
                    <td>
                        <a href={`/admin/role/${role.id}`}>edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
