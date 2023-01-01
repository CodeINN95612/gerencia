<script lang="ts">
    import type { ActionData } from "./$types";

    export let data: any;
</script>

<svelte:head>
    <title>Contract</title>
</svelte:head>

<h2>Contracts</h2>
{#if !data.contracts || data.contracts.length === 0}
    <p>No contracts available</p>
    <a href="admin/contract/0" class="btn btn-primary mt-3">Create new</a>
{:else}
    <a href={`/admin/contract/0`} class="btn btn-primary my-3">New</a>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Salary</th>
                <th scope="col">Daily Hours</th>
                <th scope="col" />
            </tr>
        </thead>
        <tbody>
            {#each data.contracts as contract}
                <tr>
                    <td>{contract.name}</td>
                    <td>{contract.salary}</td>
                    <td>{contract.dailyHours}</td>
                    <td>
                        <a href={`/admin/contract/${contract.id}`}>edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
