import { redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.employee)
        throw redirect(302, '/admin');

    return {};
}