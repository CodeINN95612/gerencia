import { db } from "$lib/database/GerenciaDB";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    const session = event.cookies.get('session');

    if (!session) {
        return await resolve(event);
    }

    const user = await db.user.findUnique({ where: { authId: session } });
    if (user) {
        event.locals.user = {
            name: user.username,
            easter: ':v'
        }
    }

    return await resolve(event);

}