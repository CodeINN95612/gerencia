import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {

    if (!locals.employee)
        throw redirect(302, '/');

    if (!locals.company)
        throw redirect(302, '/admin/');

    const fetchCompanies = async () => {
        let companies = await db.company.findMany({
            where: {
                Employee_RoleContract: {
                    some: {
                        employee: {
                            id: locals.employee.employeeId
                        }
                    }
                }
            }
        })
        return companies;
    };

    return {
        companies: fetchCompanies()
    }

}

const continueAdmin: Action = async ({ request, cookies }) => {
    const data = await request.formData();

    let id = 0;
    const idStr = data.get('company');
    if (idStr !== null) {
        id = +idStr;
    }

    if (id === 0)
        return invalid(200, { missing: true });

    cookies.set('sessionCompany', id.toString(), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, //TODO
        maxAge: 60 * 60
    });

    throw redirect(302, "/admin/employee");
}

const newCompany: Action = async => {
    throw redirect(302, '/admin/company');
}

export const actions: Actions = { continueAdmin, newCompany }; 