import { db } from "$lib/database/GerenciaDB";
import { invalid, redirect, type Action, type Actions } from "@sveltejs/kit";

const register: Action = async ({ request }) => {

    const data = await request.formData();

    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    const name = data.get('nombre')?.toString();
    const lastName = data.get('apellido')?.toString();
    const identification = data.get('identificacion')?.toString();

    if (!username || !password || !name || !lastName || !identification) {
        return invalid(400, { invalid: true });
    }
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof name !== "string" ||
        typeof lastName !== "string" ||
        typeof identification !== "string"
    ) {
        return invalid(400, { invalid: true });
    }

    const employee = await db.employee.findUnique({ where: { username } });
    if (employee) {
        return invalid(400, { user: true });
    }

    await db.employee.create({
        data: {
            name,
            lastName,
            identification,
            birthDate: new Date(),
            username,
            password,
        }
    });

    throw redirect(302, "/auth/login")

}

export const actions: Actions = { register }