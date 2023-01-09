<svelte:head>
    <title>Home</title>
    <meta name="description" content="Home page" />
</svelte:head>
<div
    class="container vh-100 d-flex align-items-center justify-content-center"
    style="max-width: 576px;"
>
    <div class="text-center">
        <h1>Bienvenidos a <strong>Gerencia!</strong></h1>
        <h5 class="mt-3">
            Sistema de administración de empleados y de nómina simple de
            utilizar y parametrizar. ...
            <br />
            Regístrate para comenzar o inicia sesión si ya tienes una cuenta
        </h5>
        <div class="row d-flex justify-content-center mt-4">
            <div class="col-10 col-sm-6">
                <a class="btn btn-primary w-100 mb-3" href="/auth/register">
                    Register
                </a>
            </div>
            <div class="col-10 col-sm-6">
                <a class="btn btn-primary w-100" href="/auth/login"> Log In </a>
            </div>
        </div>
    </div>
</div>
