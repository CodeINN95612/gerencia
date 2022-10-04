import { db } from "$lib/database/GerenciaDB";
import { redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    throw redirect(302, '/');
}

export const actions: Actions = {
    async default({ cookies }) {

        const session = cookies.get('session');

        cookies.set('session', '', {
            path: '/',
            expires: new Date(0)
        })

        await db.user.update({
            where: { authId: session },
            data: { authId: null }
        })

        throw redirect(302, '/');
    }
} 