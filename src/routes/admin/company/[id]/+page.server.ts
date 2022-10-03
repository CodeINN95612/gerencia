import type { Actions, PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import type { Company } from '@prisma/client'
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
    createOrUpdate: async ({ request, params }) => {
        const data = await request.formData();

        const id = parseInt(params.id);

        const name = data.get('name')?.toString();
        if (!name || name == "")
            return invalid(400, { name, missing: true });

        const comercialName = data.get('comercialName')?.toString()
        if (!comercialName || comercialName == "")
            return invalid(400, { comercialName, missing: true })


        const ruc = data.get('ruc')?.toString()
        if (!ruc || ruc === "")
            return invalid(400, { ruc, missing: true })

        const creationDateStr = data.get('creationDate')?.toString() ?? "";
        if (!creationDateStr || creationDateStr == "")
            return invalid(400, { creationDateStr, missing: true });
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
            return invalid(500, { id, error })
        }

        throw redirect(303, "/admin/company")
    },
};