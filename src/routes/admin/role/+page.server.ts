import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {

    const fetchRoles = async () => {
        return await db.role.findMany({
            where: {
                companyId: locals.company.id
            }
        })
    }

    return {
        roles: fetchRoles()
    }
}