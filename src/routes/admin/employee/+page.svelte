<script lang="ts">
    import type { ActionData } from "./$types";

    export let data: any;
    export let form: ActionData;
</script>

<svelte:head>
    <title>Employee</title>
</svelte:head>

<h1>Employee</h1>

<div class="container my-5">
    <form action="?/search" class="search-form" method="POST">
        <label for="company">Company: </label>
        <select name="company" id="company">
            {#each data.companies as company}
                <option value={company.id}>{company.name}</option>
            {/each}
        </select>
        <input type="submit" value="Buscar" />
    </form>
</div>

{#if form?.invalid}
    <div class="alert alert-danger">Error en servidor</div>
{/if}

{#if form?.employees}
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Assigned User</th>
                <th scope="col" />
            </tr>
        </thead>
        <tbody>
            {#each form.employees as employee}
                <tr>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.user.username}</td>
                    <td />
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
