import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Actions, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {

    const fetchContract = async () => {
        const id = +params.id;

        if (id === 0)
            return {}

        let contract = await db.contract.findUnique({ where: { id } });
        if (contract !== null) {
            contract.salary = +contract.salary;
        }
        return contract;

    }

    return {
        contract: fetchContract()
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

        const salary = data.get('salary')?.toString();
        if (!salary || salary === '') {
            return invalid(400, { missing: true })
        }

        const dailyHours = data.get('dailyHours')?.toString();
        if (!dailyHours || dailyHours === '') {
            return invalid(400, { missing: true });
        }

        try {
            if (id === 0) {
                await db.contract.create({
                    data: {
                        name,
                        description,
                        salary: +salary,
                        dailyHours: +dailyHours,
                        company: {
                            connect: {
                                id: locals.company.id
                            }
                        }
                    },
                });
            } else {
                await db.contract.update({
                    where: { id },
                    data: {
                        name,
                        description,
                        salary: +salary,
                        dailyHours: +dailyHours
                    }
                });
            }
        } catch (error) {
            return invalid(400, { is_error: true, error });
        }

        throw redirect(303, "/admin/contract");
    }
}