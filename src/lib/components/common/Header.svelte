<nav class="navbar navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon" />
        </button>
        <a href="/" class="navbar-brand"> Gerencia </a>
        <div class="navbar-nav me-auto my-2 navbar-nav-scroll">
            <li class="nav-item">
                <a href="/admin/company" class="nav-link"> Empresas </a>
            </li>
        </div>
        <form method="POST" action="/auth/logout" class="navbar-nav ms-auto">
            <li class="nav-item mx-3">
                <button class="nav-link btn bg-transparent" type="submit"
                    >Salir</button
                >
            </li>
        </form>
    </div>
</nav>
