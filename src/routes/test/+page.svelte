<script lang="ts">
    import type { ActionData } from "./$types";
    export let form: ActionData;
    const valores = form?.valores;
</script>

<svelte:head>
    <title>Contratos</title>
</svelte:head>

<div class="container">
    <form class="mt-5 mb-5" method="POST" action="?/search">
        <div class="row mb-2">
            <div class="form-group col-md-6">
                <label for="start-date">Fecha de Inicio</label>
                <input
                    type="date"
                    class="form-control"
                    id="start-date"
                    name="start-date"
                />
            </div>
            <div class="form-group col-md-6">
                <label for="end-date">Fecha de Fin</label>
                <input
                    type="date"
                    class="form-control"
                    id="end-date"
                    name="end-date"
                />
            </div>
        </div>
        <input type="submit" value="Buscar" class="btn btn-primary" />
    </form>
    {#if valores}
        {#if valores.length == 0}
            <p>No se encontraron elementos en las fechas</p>
        {/if}
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valor</th>
                </tr>
            </thead>
            <tbody>
                {#each valores as valor}
                    <tr>
                        <td>{valor.tipo}</td>
                        <td>${valor.valor}</td>
                    </tr>
                {/each}
                <tr class="table-info">
                    <td>Total</td>
                    <td>${valores.reduce((sum, v) => sum + v.valor, 0)}</td>
                </tr>
            </tbody>
        </table>
    {/if}
</div>
