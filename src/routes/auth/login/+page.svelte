<script lang="ts">
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<h1 class="mb-3">Ingresar</h1>
<form method="POST" action="?/login">
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
                value="Ingresar"
                class="btn btn-success w-100"
            />
        </div>
        <div class="col-sm-12 col-md-6">
            <a href="/auth/register" class="btn btn-secondary w-100"
                >Registrarse</a
            >
        </div>
        {#if form?.invalid}
            <div class="alert alert-danger">
                Usuario y Contraseña obligatorios
            </div>
        {/if}
        {#if form?.user === false}
            <div class="alert alert-danger">Credenciales invalidas</div>
        {/if}
    </div>
</form>
