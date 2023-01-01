import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {

    const fetchRequirements = async () => {
        let requirements = await db.company.findUnique({
            where: {
                id: locals.company.id
            },
            select: {
                roles: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                Contract: {
                    select: {
                        id: true,
                        name: true
                    }
                },

            }
        });

        return {
            roles: requirements?.roles,
            contracts: requirements?.Contract
        }
    }

    const fetchEmployee = async () => {
        const id = +params.id;

        if (id === 0)
            return {
                id: 0,
                name: "",
                lastName: "",
                username: "",
                password: "",
                identification: "",
                roleId: 0,
                contractId: 0
            }

        let employee = await db.employee.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                password: true,
                identification: true,
                Employee_RoleContract: {
                    where: {
                        companyId: locals.company.id
                    },
                    orderBy: {
                        date: 'desc'
                    },
                    take: 1,
                    select: {
                        role: {
                            select: {
                                id: true
                            }
                        },
                        contract: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });
        if (!employee) {
            return undefined;
        }

        return {
            id: employee.id,
            name: employee.name,
            lastName: employee.lastName,
            username: employee.username,
            password: employee.password,
            identification: employee.identification,
            roleId: employee.Employee_RoleContract[0].role.id,
            contractId: employee.Employee_RoleContract[0].contract.id
        };
    }

    return {
        requirements: fetchRequirements(),
        employee: fetchEmployee(),
    }
}

export const actions: Actions = {
    createOrUpdate: async ({ request, params, locals }) => {
        const data = await request.formData();

        let idStr = params.id;
        if (!idStr) {
            throw invalid(500);
        }

        let id = +idStr;

        const name = data.get('firstname')?.toString();
        if (!name || name === '') {
            return invalid(400, { missing: true });
        }

        const identification = data.get('identification')?.toString();
        if (!identification || identification === '') {
            return invalid(400, { missing: true });
        }

        const lastName = data.get('lastname')?.toString();
        if (!lastName || lastName === '') {
            return invalid(400, { missing: true });
        }

        const username = data.get('username')?.toString();
        if (!username || username === '') {
            return invalid(400, { missing: true });
        }

        const password = data.get('password')?.toString();
        if (!password || password === '') {
            return invalid(400, { missing: true });
        }

        const roleIDStr = data.get('role')?.toString();
        if (!roleIDStr || roleIDStr === '') {
            return invalid(400, { missing: true });
        }

        const contractIDStr = data.get('contract')?.toString();
        if (!contractIDStr || contractIDStr === '') {
            return invalid(400, { missing: true });
        }
        try {
            if (id === 0) {
                await db.employee.create({
                    data: {
                        name,
                        lastName,
                        birthDate: new Date(),
                        identification,
                        username,
                        password,
                        Employee_RoleContract: {
                            create: {
                                date: new Date(),
                                company: {
                                    connect: {
                                        id: locals.company.id
                                    }
                                },
                                contract: {
                                    connect: {
                                        id: +contractIDStr
                                    }
                                },
                                role: {
                                    connect: {
                                        id: +roleIDStr
                                    }
                                }
                            }
                        }
                    }
                });
            }
            else {
                await db.employee.update({
                    where: { id },
                    data: {
                        name,
                        lastName,
                        identification,
                        username,
                        password,
                        Employee_RoleContract: {
                            create: {
                                date: new Date(),
                                company: {
                                    connect: {
                                        id: locals.company.id
                                    }
                                },
                                contract: {
                                    connect: {
                                        id: +contractIDStr
                                    }
                                },
                                role: {
                                    connect: {
                                        id: +roleIDStr
                                    }
                                }
                            }
                        }
                    }
                });
            }
        } catch (error) {
            return invalid(400, { is_error: true, error });
        }

        throw redirect(303, "/admin/employee");
    }
}