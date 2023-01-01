<nav class="navbar navbar-dark navbar-expand-md bg-dark sticky-top">
    <div class="container-fluid">
        <!-- <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon" />
        </button> -->
        <a href="/" class="navbar-brand"> Gerencia </a>
        <ul
            class="navbar-nav me-auto mb-2 mb-lg-0"
            style="flex-direction:row; gap: 10px;"
        >
            <li class="nav-item">
                <a href="/admin/employee" class="nav-link"> Empleados </a>
            </li>
            <li class="nav-item">
                <a href="/admin/role" class="nav-link"> Role </a>
            </li>
            <li class="nav-item">
                <a href="/admin/contract" class="nav-link"> Contract </a>
            </li>
        </ul>
        <form method="POST" class="navbar-nav ms-auto">
            <li class="nav-item mx-3">
                <button
                    class="nav-link btn bg-transparent"
                    type="submit"
                    formaction="/auth/logout">Log Out</button
                >
            </li>
            <li class="nav-item mx-3">
                <button
                    class="nav-link btn bg-transparent"
                    type="submit"
                    formaction="/admin/">Change Company</button
                >
            </li>
        </form>
    </div>
</nav>

<style>
    .border-red {
        border: solid red;
    }
</style>
