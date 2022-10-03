<form method="POST" action="?/login">
    <div class="mb-3">
        <label for="username" class="form-label">Nombre de Usuario</label>
        <input
            class="form-control"
            type="text"
            name="username"
            id="username"
            autocomplete="off"
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
        />
    </div>
    <input type="submit" value="Ingresar" class="btn btn-primary" />
    <a href="/admin/company" class="btn btn-primary">IngresarTest</a>
</form>
