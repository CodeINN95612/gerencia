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

    const employee = await db.employee.findUnique({ where: { authId: session } });
    if (employee) {
        event.locals.employee = {
            name: employee.name,
            employeeId: employee.id
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

    return await resolve(event);

}