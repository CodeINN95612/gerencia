import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    create: async ({ request, params, locals }) => {
        const data = await request.formData();

        const name = data.get('name')?.toString();
        if (!name || name === "")
            return invalid(400, { missing_name: true });

        const creationDateStr = data.get('creationDate')?.toString() ?? "";
        if (!creationDateStr || creationDateStr === "")
            return invalid(400, { missing_date: true });
        const creationDate = new Date(creationDateStr);

        try {
            let company = await db.company.create({
                data: {
                    name,
                    creationDate,
                    roles: {
                        create: {
                            name: 'Admin',
                            description: 'System Admin',
                            isAdmin: true
                        }
                    },
                    Contract: {
                        create: {
                            dailyHours: 6,
                            description: 'System Administrator',
                            name: 'System Admin',
                            salary: 1_500.00,
                        }
                    }
                },
                select: {
                    id: true,
                    roles: true,
                    Contract: true
                }
            })
            await db.employee_RoleContract.create({
                data: {
                    date: new Date(),
                    company: {
                        connect: {
                            id: company.id
                        }
                    },
                    employee: {
                        connect: {
                            id: locals.employee.employeeId
                        }
                    },
                    contract: {
                        connect: {
                            id: company.Contract[0].id
                        }
                    },
                    role: {
                        connect: {
                            id: company.roles[0].id
                        }
                    }
                }
            })
        }
        catch (error) {

            if (error.code === 'P2002') {
                console.log(error);
                return invalid(400, { is_error: true, repeat: error.meta.target });
            }

            return invalid(500, { is_error: true });
        }

        throw redirect(303, "/admin")
    },
};