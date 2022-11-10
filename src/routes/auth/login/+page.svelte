<script lang="ts">
    import type { ActionData } from "./$types";
    import logoBarra from "$lib/img/LogoBarra.svg";
    import inicio from "$lib/img/IconoInicio.svg";
    import productos from "$lib/img/IconoProductos.svg";
    import logo from "$lib/img/LogoInicio.png";
    import titulo from "$lib/img/TituloInicio.svg";
    import subtitulo from "$lib/img/SubtituloInicio.svg";

    export let form: ActionData;
</script>

<!-- <h1 class="mb-3">Ingresar</h1>
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
</form> -->

<div class="bar">
    <div class="bar-logo">
        <img src={logoBarra} alt="logo" class="bar-logo-img" />
    </div>
    <div class="bar-content">
        <div class="bar-content-item">
            <img src={inicio} alt="icon" class="bar-content-item-icon" />
            <p>Inicio</p>
        </div>
        <hr />
        <div class="bar-content-item">
            <img src={productos} alt="icon" class="bar-content-item-icon" />
            <p>Productos</p>
        </div>
    </div>
</div>
<div class="content">
    <form class="column" method="POST" action="?/login">
        <img src={logo} alt="Logo" class="logo" />
        <img src={titulo} alt="Titulo" class="logo-title" />
        <img src={subtitulo} alt="Subtitulo" class="logo-subtitle" />
        <div class="input">
            <p class="input-label">Usuario</p>
            <input
                type="text"
                name="username"
                id="username"
                class="input-field"
                placeholder="Ingresa el Usuario"
                required
            />
        </div>
        <div class="input">
            <p class="input-label">Contraseña</p>
            <input
                type="password"
                name="password"
                id="password"
                class="input-field"
                placeholder="Ingresa la Contraseña"
                required
            />
        </div>
        <div class="input">
            <p class="input-label">Contraseña</p>
            <select
                list="moneda-list"
                name="moneda"
                id="moneda"
                class="input-field"
                required
            >
                <option value="USD">USD</option>
                <option value="USD">EU</option>
            </select>
        </div>
        <input type="submit" class="input-button" value="Ingresar" />
        {#if form?.invalid}
            <div class="alert alert-danger">
                Usuario y Contraseña obligatorios
            </div>
        {/if}
        {#if form?.user === false}
            <div class="alert alert-danger">Credenciales invalidas</div>
        {/if}
    </form>
</div>

<style>
    p {
        padding: 0;
        margin: 0;
    }

    .bar {
        background-color: #9c0633;
        background-image: linear-gradient(
            to bottom,
            #9c0633 0,
            #58001b 70%,
            #000 100%
        );
    }

    .bar-logo {
        margin: 10%;
        margin-top: 15%;
    }
    .bar-logo-img {
        width: 100%;
    }

    .bar-content {
        margin: 7%;
        margin-top: 0;
    }

    .bar-content-item {
        color: white;
        font-size: 15pt;
        font-weight: 200;
        display: flex;
        align-items: center;
    }

    .bar-content-item p {
        padding: 0;
        margin: 0;
        margin-left: 10px;
    }

    .bar-content-item-icon {
        width: 35px;
    }

    hr {
        margin-block: 10px;
        padding: 0;
        margin-left: 40px;
        margin-right: 10px;
        border-width: 3px;
        color: #fff;
    }

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .column {
        display: grid;
        justify-items: center;
    }

    .logo {
        width: 200px;
        margin-bottom: 10px;
    }

    .logo-title {
        width: 250px;
        margin-bottom: 20px;
    }

    .logo-subtitle {
        width: 260px;
        margin-bottom: 30px;
    }

    .input-field {
        width: 375px;
        border: none;
        background: #d9d9d9;
        padding-inline: 5px;
    }

    .input-button {
        margin-block: 15px;
        font-size: 12pt;
        font-weight: 500;
        color: #fff;
        text-align: center;
        border: none;
        border-radius: 25px;
        background-color: #4b4b4a;
        padding: 0;
        padding-block: 5px;
        padding-inline: 25px;
    }
</style>
