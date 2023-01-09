import { db } from "$lib/database/GerenciaDB";
import { invalid, redirect, type Action, type Actions } from "@sveltejs/kit";

const login: Action = async ({ request, cookies }) => {
    const data = await request.formData();

    const username = data.get('username');
    const password = data.get('password');

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return invalid(400, { invalid: true })
    }

    const employee = await db.employee.findUnique({ where: { username } })

    if (!employee) {
        return invalid(400, { user: false })
    }

    if (employee.password != password) {
        return invalid(400, { user: false })
    }

    const authId = crypto.randomUUID();

    await db.employee.update({
        where: { username },
        data: { authId }
    });

    cookies.set('session', authId, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, //TODO
        maxAge: 60 * 60
    });

    throw redirect(302, "/admin")

}


export const actions: Actions = { login };