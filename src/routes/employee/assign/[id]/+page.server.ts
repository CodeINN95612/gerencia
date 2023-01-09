import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Actions, redirect } from '@sveltejs/kit';
import { Hard } from '$lib/Enums/Difficulty'
import { High } from '$lib/Enums/Priority'

export const load: PageServerLoad = async ({ locals, params }) => {

    const fetchAssigned = async () => {
        let assigned = await db.assignedActivity.findFirst({
            where: {
                id: +params.id,
                NOT: [
                    { completed: true }
                ]
            },
            select: {
                name: true,
                description: true,
                difficulty: true,
                priority: true,
                estimatedHours: true,
                assignedToId: true,
                maxDate: true
            }
        });

        if (!assigned) {
            return {
                name: '',
                description: '',
                difficulty: Hard.value,
                priority: High.value,
                estimatedHours: 1,
                assignedToId: 0,
                maxDate: new Date(),
            }
        }
        return assigned;
    }

    const fetchEmployees = async () => {
        let employees = db.employee.findMany({
            where: {
                superiorId: locals.employee.employeeId,
            },
            select: {
                id: true,
                name: true,
            }
        });
        return employees;
    }

    return {
        employees: fetchEmployees(),
        assignedActivity: fetchAssigned()
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

        const description = data.get('description')?.toString();
        if (!description || description === '') {
            return invalid(400, { missing: true });
        }

        const difficultyStr = data.get('difficulty')?.toString();
        if (!difficultyStr || difficultyStr === '') {
            return invalid(400, { missing: true });
        }
        const difficulty = +difficultyStr;

        const priorityStr = data.get('priority')?.toString();
        if (!priorityStr || priorityStr === '') {
            return invalid(400, { missing: true });
        }
        const priority = +priorityStr;

        const assignedToStr = data.get('assignedTo')?.toString();
        if (!assignedToStr || assignedToStr === '') {
            return invalid(400, { missing: true });
        }
        const assignedTo = +assignedToStr;

        const hoursStr = data.get('hours')?.toString();
        if (!hoursStr || hoursStr === '') {
            return invalid(400, { missing: true });
        }
        const estimatedHours = +hoursStr;

        const maxDateStr = data.get('maxDate')?.toString();
        if (!maxDateStr || maxDateStr === '') {
            return invalid(400, { missing: true });
        }
        const maxDate = new Date(maxDateStr);

        const assignedDate = new Date();

        const completed = false;

        try {
            if (id === 0) {
                await db.assignedActivity.create({
                    data: {
                        completed,
                        assignedDate,
                        description,
                        difficulty,
                        priority,
                        estimatedHours,
                        maxDate,
                        name,
                        assignedBy: {
                            connect: {
                                id: locals.employee.employeeId
                            }
                        },
                        assignedTo: {
                            connect: {
                                id: assignedTo
                            }
                        }
                    }
                });
            }
            else {
                await db.assignedActivity.update({
                    where: {
                        id
                    },
                    data: {
                        completed,
                        name,
                        description,
                        difficulty,
                        priority,
                        assignedDate,
                        estimatedHours,
                        maxDate,
                        assignedTo: {
                            connect: {
                                id: assignedTo
                            }
                        }
                    }
                });
            }
        } catch (error) {
            return invalid(400, { is_error: true, error });
        }

        throw redirect(302, "/employee/assign");
    }
}