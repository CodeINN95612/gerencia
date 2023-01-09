import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    throw redirect(302, 'employee/activity');
}