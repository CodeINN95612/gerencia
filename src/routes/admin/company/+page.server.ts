import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'

export const load: PageServerLoad = async (event) => {

    const fetchCompanies = async () => {
        return await db.company.findMany()
    }

    return {
        companies: fetchCompanies()
    }
}