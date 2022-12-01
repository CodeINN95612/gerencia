import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {

    const fetchRoles = async () => {
        return await db.role.findMany({
            where: {
                companyId: +params.c_id,
                isActive: true,
            }
        })
    }
    const fetchEmployee = async () => {
        const id = +params.id;

        if (id === 0)
            return {
                id,
                user: {
                    username: '',
                    paswword: ''
                }
            };

        return await db.employee.findUnique({
            where: { id },
            select: {
                firstName: true,
                lastName: true,
                phone: true,
                mobilePhone: true,
                email: true,
                addres: true,
                id: true,
                user: {
                    select: {
                        username: true,
                        password: true
                    }
                }
            }
        })
    }

    const fetchCurrentRole = async () => {
        const c_id = +params.c_id;
        const id = +params.id;

        if (id === 0)
            return {
                id: 1
            }

        const employee = await db.employee.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        return db.userCompanyRole.findFirstOrThrow({
            where: { companyId: c_id, userId: employee?.user?.id },
            select: {
                role: {
                    select: {
                        id: true
                    }
                }
            }
        })
    }

    return {
        roles: fetchRoles(),
        employee: fetchEmployee(),
        role: fetchCurrentRole()
    }
}

export const actions: Actions = {
    createOrUpdate: async ({ request, params }) => {
        const data = await request.formData();

        let c_id = parseInt(params.c_id);
        let id = parseInt(params.id);

        const firstName = data.get('firstname')?.toString();
        if (!firstName || firstName === '') {
            return invalid(400, { missing: true });
        }

        const lastName = data.get('lastname')?.toString();
        if (!lastName || lastName === '') {
            return invalid(400, { missing: true });
        }

        const phone = data.get('phone')?.toString();
        if (!phone || phone === '') {
            return invalid(400, { missing: true });
        }

        const mobilePhone = data.get('mobilephone')?.toString();
        if (!mobilePhone || mobilePhone === '') {
            return invalid(400, { missing: true });
        }

        const email = data.get('email')?.toString();
        if (!email || email === '') {
            return invalid(400, { missing: true });
        }

        const addres = data.get('address')?.toString();
        if (!addres || addres === '') {
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

        const company = await db.company.findUnique({
            where: { id: c_id },
            select: { id: true }
        })
        if (!company) {
            return invalid(400, { missing: true });
        }

        const role = await db.role.findUnique({
            where: { id: +roleIDStr },
            select: { id: true }
        });
        if (!role) {
            return invalid(400, { missing: true });
        }

        try {
            if (id === 0) {
                const employee = await db.employee.create({
                    data: {
                        firstName,
                        lastName,
                        phone,
                        mobilePhone,
                        email,
                        addres,
                        user: {
                            create: {
                                username,
                                password
                            }
                        }
                    },
                    include: {
                        user: true
                    }
                });

                await db.userCompanyRole.create({
                    data: {
                        companyId: company.id,
                        creationDate: new Date(),
                        isActive: true,
                        roleId: role.id,
                        userId: employee.userId,
                    }
                });
            }
            else {
                const employee = await db.employee.update({
                    where: { id },
                    data: {
                        firstName,
                        lastName,
                        phone,
                        mobilePhone,
                        email,
                        addres,
                        user: {
                            update: {
                                username,
                                password
                            }
                        }
                    }
                });

                const companyRole = await db.userCompanyRole.findFirstOrThrow({
                    where: { companyId: c_id, userId: employee.userId }
                })

                await db.userCompanyRole.update({
                    where: { id: companyRole.id },
                    data: {
                        roleId: role.id
                    }
                })
            }
        } catch (error) {
            return invalid(400, { is_error: true, error });
        }

        throw redirect(303, "/admin/employee");
    }
}