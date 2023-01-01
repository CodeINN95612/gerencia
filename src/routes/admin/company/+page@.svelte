<script lang="ts">
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<svelte:head>
    <title>New Company</title>
</svelte:head>

<div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="border">
        <form class="d-flex flex-column p-5" action="?/create" method="POST">
            <h2>New Company</h2>

            <label for="name">Nombre</label>
            <input type="text" name="name" id="name" required />

            <label for="creationDate">Fecha Creacion</label>
            <input type="date" name="creationDate" id="creationDate" required />

            <input type="submit" value="Create" class="mt-3 btn btn-primary" />
            <a href="/admin/" class="mt-1 mb-3 btn btn-secondary">Return</a>
            {#if form?.missing_name}
                <div class="aler alert-danger">Nombre es obligatorio</div>
            {/if}
            {#if form?.missing_date}
                <div class="aler alert-danger">Fecha es obligatoria</div>
            {/if}
            {#if form?.is_error}
                {#if form?.repeat}
                    <div class="alert alert-danger">
                        Error: Se repite {form?.repeat}
                    </div>
                {:else}
                    <div class="alert alert-danger">Error: 500 Internal</div>
                {/if}
            {/if}
        </form>
    </div>
</div>

<style>
    input {
        margin-bottom: 10px;
    }
</style>
