import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'

export const load: PageServerLoad = async ({ locals }) => {

    const fetchContracts = async () => {
        let contracts = await db.contract.findMany({
            where: {
                companyId: locals.company.id
            },
            select: {
                id: true,
                name: true,
                salary: true,
                dailyHours: true,
            }
        });
        contracts.forEach(c => {
            c.salary = +c.salary;
        });
        return contracts;

    }

    return {
        contracts: fetchContracts()
    }
}