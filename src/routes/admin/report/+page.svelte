<script lang="ts">
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<svelte:head>
    <title>Reporte</title>
</svelte:head>

<h2>Reporte de Empleados</h2>

<br />

<form action="?/search" method="POST">
    <label for="fechaInicio">Fecha Inicio</label>
    <input type="date" name="fechaInicio" id="fechaInicio" required />
    <label for="fechaFin">Fecha Fin</label>
    <input type="date" name="fechaFin" id="fechaFin" required />
    <input type="submit" value="Buscar" />
</form>

<br />

<table class="table">
    <thead>
        <tr>
            <th scope="col">Empleado</th>
            <th scope="col">Horas Esperadas</th>
            <th scope="col">Horas Trabajadas</th>
            <th scope="col">Actividades Finalizadas</th>
            <th scope="col">Actividades en Proceso</th>
            <th scope="col">Actividades Ordenadas</th>
            <th scope="col">Calificacion</th>
        </tr>
    </thead>
    <tbody>
        {#if form?.reporte}
            {#each form?.reporte as fila}
                <tr>
                    <td>{fila.empleado}</td>
                    <td>{fila.horasEsperadas}</td>
                    <td>{fila.horasTrabajadas}</td>
                    <td>{fila.actividadesFinalizadas}</td>
                    <td>{fila.actividadesProceso}</td>
                    <td>{fila.actividadesOrdenadas}</td>
                    <td style="background: {fila.color}">{fila.calificacion}</td
                    >
                </tr>
            {/each}
        {/if}
    </tbody>
</table>
