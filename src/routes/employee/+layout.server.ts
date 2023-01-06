import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'

export const load: LayoutServerLoad = async ({ locals }) => {

    if (!locals.employee)
        throw redirect(302, '/');

    if (!locals.company || !locals.role.id)
        throw redirect(302, '/admin/');

    if (locals.role.isAdmin) {
        throw redirect(302, '/admin/');
    }

    const canAssign = (await db.employee
        .findUnique({
            where: {
                id: locals.employee.employeeId
            },
            select: {
                Employees: true
            }
        }))?.Employees.length ?? 0 > 0;
    return {
        employee: locals.employee,
        role: locals.role,
        canAssign,
    }
}