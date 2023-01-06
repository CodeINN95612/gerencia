import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { Difficulties } from '$lib/Enums/Difficulty';
import { Priorities } from '$lib/Enums/Priority';

export const load: PageServerLoad = async ({ locals }) => {

    const fetchActivities = async () => {
        let activities = await db.assignedActivity.findMany({
            where: {
                assignedBy: {
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
                assignedDate: true,
                completed: true,
                priority: true,
                assignedTo: {
                    select: {
                        name: true,
                    }
                },
                maxDate: true,
            },
        });

        if (activities.length == 0) {
            return []
        }

        return activities.map(a => ({
            id: a.id,
            name: a.name,
            hours: a.estimatedHours,
            date: a.assignedDate.toLocaleDateString(),
            completed: a.completed,
            difficulty: Difficulties.filter(d => d.value == a.difficulty)[0].name,
            priority: Priorities.filter(d => d.value == a.priority)[0].name,
            assignedTo: a.assignedTo.name,
            maxDate: a.maxDate.toLocaleDateString(),
        }));
    }
    return {
        assignedActivities: fetchActivities(),
    }
}