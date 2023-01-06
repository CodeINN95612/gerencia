import { db } from "$lib/database/GerenciaDB";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    const session = event.cookies.get('session');
    const sessionCompany = event.cookies.get('sessionCompany');

    // const sverdle = event.cookies.get('sverdle'); //Where is this cookie set???
    // if (sverdle)
    //     event.cookies.set('sverdle', '', {
    //         path: '/',
    //         expires: new Date(0)
    //     })

    if (!session) {
        return await resolve(event);
    }

    const employee = await db.employee.findUnique({
        where: { authId: session },
        select: {
            name: true,
            id: true,
        }
    });
    if (employee) {
        event.locals.employee = {
            name: employee.name,
            employeeId: employee.id,
        };
    }

    if (!sessionCompany)
        return await resolve(event);

    const company = await db.company.findUnique({ where: { id: +sessionCompany } });
    if (company) {
        event.locals.company = {
            name: company.name,
            id: company.id
        };
    }

    if (!company || !employee) {
        return await resolve(event);
    }

    const role = await db.employee_RoleContract.findFirst({
        where: {
            companyId: company.id,
            employeeId: employee.id
        },
        orderBy: {
            date: 'desc'
        },
        select: {
            role: {
                select: {
                    id: true,
                    isAdmin: true
                }
            }
        }
    });

    if (role) {
        event.locals.role = {
            id: role.role.id,
            isAdmin: role.role.isAdmin
        }
    }
    return await resolve(event);

}