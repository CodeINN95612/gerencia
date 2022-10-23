import { db } from "$lib/database/GerenciaDB";
import type { User } from "@prisma/client";
import { invalid, redirect, type Action, type Actions } from "@sveltejs/kit";

const register: Action = async ({ request }) => {

    const data = await request.formData();

    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password ||
        typeof username !== 'string' ||
        typeof password !== 'string') {
        return invalid(400, { invalid: true });
    }

    const user = await db.user.findUnique({ where: { username } });
    if (user) {
        return invalid(400, { user: true });
    }

    await db.user.create({
        data: {
            username,
            password,
        }
    });

    throw redirect(302, "/auth/login")

}

export const actions: Actions = { register }