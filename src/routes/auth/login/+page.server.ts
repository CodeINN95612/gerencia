import { db } from "$lib/database/GerenciaDB";
import type { User } from "@prisma/client";
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

    const user = await db.user.findUnique({ where: { username } })

    if (!user) {
        return invalid(400, { user: false })
    }

    if (user.password != password) {
        return invalid(400, { user: false })
    }

    const authId = crypto.randomUUID();

    await db.user.update({
        where: { username },
        data: { authId }
    });

    cookies.set('session', authId, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, //TODO
        maxAge: 60 * 15
    });

    throw redirect(302, "/test")

}


export const actions: Actions = { login };