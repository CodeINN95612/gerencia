<script lang="ts">
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<h1 class="mb-3">Regístrate</h1>
<form method="POST" action="?/register">
    <div class="mb-3">
        <label for="username" class="form-label">Nombre de Usuario</label>
        <input
            class="form-control"
            type="text"
            name="username"
            id="username"
            autocomplete="off"
            required
        />
    </div>
    <div class="mb-3">
        <label class="form-label" for="password">Contraseña</label>
        <input
            class="form-control"
            type="password"
            name="password"
            id="password"
            autocomplete="off"
            required
        />
    </div>
    <div class="row g-2">
        <div class="col-sm-12 col-md-6">
            <input
                type="submit"
                value="Registrarse"
                class="btn btn-success w-100"
            />
        </div>
        <div class="col-sm-12 col-md-6">
            <a href="/auth/login" class="btn btn-secondary w-100">Ingresar</a>
        </div>
    </div>

    {#if form?.invalid}
        <div class="alert alert-danger">Usuario y Contraseña obligatorios</div>
    {/if}

    {#if form?.user}
        <div class="alert alert-danger">Usuario ya existe</div>
    {/if}
</form>
