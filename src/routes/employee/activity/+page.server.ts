import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { Difficulties } from '$lib/Enums/Difficulty';
import { Priorities } from '$lib/Enums/Priority';

export const load: PageServerLoad = async ({ locals }) => {

    const fetchActivities = async () => {
        let activities = await db.activity.findMany({
            where: {
                employee: {
                    id: locals.employee.employeeId,
                },
                date: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 0)),
                },
            },
            select: {
                id: true,
                name: true,
                hours: true,
                difficulty: true,
                date: true,
                completed: true,
            },
        });

        return activities.map(a => ({
            id: a.id,
            name: a.name,
            hours: a.hours,
            date: a.date.toLocaleDateString(),
            completed: a.completed,
            difficulty: Difficulties.filter(d => d.value == a.difficulty)[0].name,
        }))
    }

    const fetchAssigned = async () => {
        let activities = await db.assignedActivity.findMany({
            where: {
                assignedTo: {
                    id: locals.employee.employeeId,
                },
                NOT: [
                    { completed: true }
                ]
            },
            select: {
                id: true,
                name: true,
                estimatedHours: true,
                difficulty: true,
                maxDate: true,
                completed: true,
                priority: true,
            },
        });

        return activities.map(a => ({
            id: a.id,
            name: a.name,
            estimatedHours: a.estimatedHours,
            date: a.maxDate.toLocaleDateString(),
            completed: a.completed,
            difficulty: Difficulties.filter(d => d.value == a.difficulty)[0].name,
            priority: Priorities.filter(d => d.value == a.priority)[0].name,
        }))
    }

    return {
        activities: fetchActivities(),
        assigned: fetchAssigned(),
    }
}