import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'

export const load: PageServerLoad = async ({ locals }) => {

    const fetchEmployees = async () => {
        let employees = await db.employee.findMany({
            where: {
                Employee_RoleContract: {
                    some: {
                        companyId: locals.company.id
                    }
                }
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                Employee_RoleContract: {
                    orderBy: {
                        date: 'desc'
                    },
                    take: 1,
                    select: {
                        role: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return employees.map(e => ({
            id: e.id,
            name: e.name,
            lastName: e.lastName,
            username: e.username,
            role: e.Employee_RoleContract[0].role.name,
        }));
    }

    return {
        employees: fetchEmployees()
    }
}