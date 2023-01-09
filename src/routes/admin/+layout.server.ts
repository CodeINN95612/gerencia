import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {

    if (!locals.employee)
        throw redirect(302, '/');

    if (!locals.company || !locals.role.id)
        throw redirect(302, '/admin/');

    if (!locals.role.isAdmin) {
        throw redirect(302, '/employee/activity');
    }
    return {
        user: locals.employee,
        company: locals.company
    }
}