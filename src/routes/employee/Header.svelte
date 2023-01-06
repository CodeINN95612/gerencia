<script lang="ts">
    export let canAssign: boolean;
</script>

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
                <a href="/employee/activity" class="nav-link"> Activities </a>
            </li>
            {#if canAssign}
                <li class="nav-item">
                    <a href="/employee/assign" class="nav-link"> Assign </a>
                </li>
            {/if}
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
