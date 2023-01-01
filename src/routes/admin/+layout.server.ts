import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {

    if (!locals.employee)
        throw redirect(302, '/');

    if (!locals.company)
        throw redirect(302, '/admin/');

    return {
        user: locals.employee,
        company: locals.company
    }
}