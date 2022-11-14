import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'

export const load: PageServerLoad = async ({ locals }) => {

    const fetchCompanies = async () => {
        return await db.company.findMany({
            where: { creationUserId: locals.user.id, }
        });
    }

    return {
        companies: fetchCompanies()
    }
}
