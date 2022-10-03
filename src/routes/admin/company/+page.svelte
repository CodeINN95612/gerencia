<script lang="ts">
    export let data: any;
</script>

<h1>Empresas</h1>
<br />
<div>
    <a href="/admin/company/0" class="btn btn-primary mb-3">Nuevo</a>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Nombre Comercial</th>
                <th scope="col">Ruc</th>
                <th scope="col">Activo</th>
                <th scope="col" />
            </tr>
        </thead>
        <tbody>
            {#each data.companies as company}
                <tr>
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>{company.comercialName}</td>
                    <td>{company.ruc}</td>
                    <td>{company.isActive ? "Si" : "No"}</td>
                    <td>
                        <a href={`/admin/company/${company.id}`}>edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
