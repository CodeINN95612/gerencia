# Proyecto de Gerencia en SvelteKit
Se trata de un sistema de administración de empleados y de nómina simple de utilizar y parametrizar.
Es creada en SvelteKit con TypeScript.

## ¿Cómo ejecutar el proyecto?

1. Clonar el repositorio
2. En una consola ejecutar el comando `npm install` para instalar las dependencias.
3. Se debe definir una variable de entorno en un archivo `.env` con el nombre **DATABASE_URL** que debe apuntar a una base de tipo PostgreSQL local o en la nube.
4. Una vez instalado todo, Se puede iniciar el proyecto con `npm run dev`.
5. Si se desea iniciar sesion, se puede usar el usuario por defecto de usuario y contraseña `admin`

- Tambien se puede acceder a la base de datos a travéz del administrador de base de datos prisma, para esto en una consola se puede ejecutar el comando `npx prisma studio`.

## ¿Cómo usar el proyecto?
Actualmente el proyecto solo tiene la funcionalidad de Autenticación, Autorización y un crud básico en la tabla de `Company`. Tambien se puede visualizar empleados creados en la pestaña de empleados.

Para iniciar sesión se requiere ir al url `/auth/login`.
Para registrarse se requiere ir al url `/auth/regiser`.

Si ya se encuentra iniciado sesión puede dirigirse a la lista de empresas en `/admin/company`, para crear una nueva empresa puede ir a `/admin/company/0`, para visitar una companía que ya existe debe ir a `admin/company/id` donde id es un entero y es el idedntificador de la empresa en la base de datos.

Para ver los empleados se dirije a `/admin/employee`. Proximamente se hará el crud completo.

El sistema ya tiene botones y links de enrutamiento por defecto entonces, en teoría, no debería necesitarse utilizar ninguno de los url previamente mencionados.

## Créditos
- Damián Briones: Creador y programador único.

## Tests
No se han realizado tests por el momento.