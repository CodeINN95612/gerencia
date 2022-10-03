<script lang="ts">
    import type { Company } from "@prisma/client";

    export let data: any;
    let company: Company = data.company;
    let date = company.creationDate.toISOString().split("T")[0];
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
            />
        </div>
        <div class="row">
            <label for="comercialName">Nombre Comercial</label>
            <input
                type="text"
                name="comercialName"
                id="comercialName"
                bind:value={company.comercialName}
            />
        </div>
        <div class="row">
            <label for="ruc">Ruc</label>
            <input type="text" name="ruc" id="ruc" bind:value={company.ruc} />
        </div>
        <div class="row">
            <label for="creationDate">Fecha Creacion</label>
            <input
                type="date"
                name="creationDate"
                id="creationDate"
                bind:value={date}
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
    </form>
</div>
