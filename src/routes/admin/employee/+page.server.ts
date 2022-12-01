import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions } from '@sveltejs/kit';
import { detach_before_dev } from 'svelte/internal';
import type { Employee, User } from '@prisma/client';

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

const search: Action = async ({ request }) => {
    const data = await request.formData();
    var id = 0;

    const idStr = data.get('company');
    if (idStr !== null) {
        id = +idStr;
    }

    const employeeSelection = await db.company.findUnique({
        where: { id },
        select: {
            id: true,
            userCompanyRoles: {
                select: {
                    user: {
                        select: {
                            employee: {
                                select: {
                                    id: true,
                                    user: true,
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (employeeSelection === null) {
        return invalid(500, { invalid: true });
    }

    var employees = employeeSelection.userCompanyRoles
        .map(u => u.user.employee)
        .filter(e => {
            return e !== null;
        });

    return invalid(200, { employees, companyId: employeeSelection.id });
}

export const actions: Actions = { search }; 