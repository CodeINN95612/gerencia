import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {

    const fetchRole = async () => {
        const id = +params.id;

        if (id === 0)
            return {}

        return await db.role.findUnique({ where: { id } });
    }

    return {
        role: fetchRole()
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

        const name = data.get('name')?.toString();
        if (!name || name === '') {
            return invalid(400, { missing: true });
        }

        const description = data.get('detail')?.toString();
        if (!description || description === '') {
            return invalid(400, { missing: true });
        }

        const isAdmin = data.get('isAdmin') === "on";

        try {
            if (id === 0) {
                await db.role.create({
                    data: {
                        name,
                        description,
                        isAdmin,
                        companyId: locals.company.id
                    }
                });
            } else {

                await db.role.update({
                    where: { id },
                    data: {
                        name,
                        description,
                        isAdmin
                    }
                });
            }
        } catch (error) {
            return invalid(400, { is_error: true, error });
        }

        throw redirect(303, "/admin/role");
    }
}