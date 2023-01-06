import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Actions, redirect } from '@sveltejs/kit';
import { Hard } from '$lib/Enums/Difficulty'

export const load: PageServerLoad = async ({ locals, params }) => {

    const fetchAssigned = async () => {
        let assigned = await db.assignedActivity.findFirst({
            where: {
                id: +params.id
            },
            select: {
                name: true,
                description: true,
                difficulty: true,
                estimatedHours: true,
                maxDate: true,
            }
        });

        if (!assigned) {
            return {
                name: '',
                description: '',
                difficulty: Hard,
                estimatedHours: 1,
                maxDate: new Date(),
            }
        }
        return assigned;
    }

    return {
        assignedActivity: fetchAssigned()
    }
}

export const actions: Actions = {
    create: async ({ request, params, locals }) => {
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

        const description = data.get('description')?.toString();
        if (!description || description === '') {
            return invalid(400, { missing: true });
        }

        const difficultyStr = data.get('difficulty')?.toString();
        if (!difficultyStr || difficultyStr === '') {
            return invalid(400, { missing: true });
        }
        const difficulty = +difficultyStr;

        const hoursStr = data.get('hours')?.toString();
        if (!hoursStr || hoursStr === '') {
            return invalid(400, { missing: true });
        }
        const hours = +hoursStr;

        const dateTimeStr = data.get('maxDate')?.toString();
        if (!dateTimeStr || dateTimeStr === '') {
            return invalid(400, { missing: true });
        }
        const maxDate = new Date(dateTimeStr);
        const date = new Date();

        const completed = data.get('completed') === "on";
        console.log(completed);

        try {
            if (id === 0) {
                await db.activity.create({
                    data: {
                        completed,
                        date,
                        description,
                        difficulty,
                        hours,
                        name,
                        maxDate,
                        employee: {
                            connect: {
                                id: locals.employee.employeeId
                            }
                        }
                    }
                });
            }
            else {
                await db.activity.create({
                    data: {
                        completed,
                        date,
                        description,
                        difficulty,
                        hours,
                        name,
                        maxDate,
                        employee: {
                            connect: {
                                id: locals.employee.employeeId
                            }
                        },
                        assignedActivity: {
                            connect: {
                                id
                            },
                        }
                    }
                });
                if (completed) {
                    await db.assignedActivity.update({
                        where: {
                            id
                        },
                        data: {
                            completed: true
                        }
                    })
                }
            }
        } catch (error) {
            return invalid(400, { is_error: true, error });
        }

        throw redirect(302, "/employee/activity");
    }
}