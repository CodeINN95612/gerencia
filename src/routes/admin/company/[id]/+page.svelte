<script lang="ts">
    import type { ActionData } from "./$types";
    import type { Company } from "@prisma/client";

    export let data: any;
    let company: Company = data.company;
    let date = company.creationDate.toISOString().split("T")[0];

    export let form: ActionData;
</script>

<h1>{company.name ?? "Nueva Empresa"}</h1>
<div class="container-sm d-flex">
    <form class="form" action="?/createOrUpdate" method="POST">
        <div class="row">
            <label for="name">Nombre</label>
            <input
                type="text"
                name="name"
                id="name"
                bind:value={company.name}
                required
            />
        </div>
        <div class="row">
            <label for="comercialName">Nombre Comercial</label>
            <input
                type="text"
                name="comercialName"
                id="comercialName"
                bind:value={company.comercialName}
                required
            />
        </div>
        <div class="row">
            <label for="ruc">Ruc</label>
            <input
                type="text"
                name="ruc"
                id="ruc"
                bind:value={company.ruc}
                required
            />
        </div>
        <div class="row">
            <label for="creationDate">Fecha Creacion</label>
            <input
                type="date"
                name="creationDate"
                id="creationDate"
                bind:value={date}
                required
            />
        </div>
        <div class="row">
            <label for="isActive" class="col-auto">Activo</label>
            <input
                type="checkbox"
                name="isActive"
                id="isActive"
                class="col-auto"
                bind:checked={company.isActive}
            />
        </div>
        <input
            type="submit"
            value={company.id === 0 ? "Crear" : "Editar"}
            class="mt-3"
        />
        {#if form?.missing_name}
            <div class="aler alert-danger">Nombre es obligatorio</div>
        {/if}
        {#if form?.missing_commercial}
            <div class="aler alert-danger">Nombre Comercial es obligatorio</div>
        {/if}
        {#if form?.missing_ruc}
            <div class="aler alert-danger">Ruc es obligatorio</div>
        {/if}
        {#if form?.missing_date}
            <div class="aler alert-danger">Fecha es obligatoria</div>
        {/if}
        {#if form?.is_error}
            <div class="aler alert-danger">
                Error: {form?.error}
            </div>
        {/if}
    </form>
</div>
