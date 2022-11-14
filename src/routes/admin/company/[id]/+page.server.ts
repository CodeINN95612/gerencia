import type { Actions, PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (params) => {

    const fetchCompany = async () => {
        const company = await db.company.findUnique({
            where: {
                id: +params.params.id
            }
        });
        if (!company)
            return {
                id: 0,
                creationDate: new Date()
            };
        return company;
    }

    return {
        company: fetchCompany()
    }
}


export const actions: Actions = {
    createOrUpdate: async ({ request, params, locals }) => {
        const data = await request.formData();

        const id = parseInt(params.id);

        const name = data.get('name')?.toString();
        if (!name || name == "")
            return invalid(400, { missing_name: true });

        const comercialName = data.get('comercialName')?.toString()
        if (!comercialName || comercialName == "")
            return invalid(400, { missing_commercial: true })


        const ruc = data.get('ruc')?.toString()
        if (!ruc || ruc === "")
            return invalid(400, { missing_ruc: true })

        const creationDateStr = data.get('creationDate')?.toString() ?? "";
        if (!creationDateStr || creationDateStr == "")
            return invalid(400, { missing_date: true });
        const creationDate = new Date(creationDateStr);

        const isActive = data.get('isActive') == "on";
        try {
            if (id === 0) {
                await db.company.create({
                    data: {
                        name,
                        comercialName,
                        ruc,
                        creationDate,
                        creationUserId: locals.user.id,
                        isActive
                    }
                });
            }
            else {
                await db.company.update({
                    where: { id }, data: {
                        id,
                        name,
                        comercialName,
                        ruc,
                        creationDate,
                        isActive
                    }
                });
            }
        }
        catch (error) {
            return invalid(400, { is_error: true, error })
        }

        throw redirect(303, "/admin/company")
    },
};