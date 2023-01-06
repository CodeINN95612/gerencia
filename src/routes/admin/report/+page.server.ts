import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    search: async ({ request, params, locals }) => {
        const data = await request.formData();

        const fechaInicioStr = data.get('fechaInicio')?.toString();
        if (!fechaInicioStr) {
            return invalid(400, { missing: true });
        }
        const fechaInicio = new Date(fechaInicioStr);

        const fechaFinStr = data.get('fechaFin')?.toString();
        if (!fechaFinStr) {
            return invalid(400, { missing: true });
        }
        const fechaFin = new Date(fechaFinStr);

        const empleados = await db.employee.findMany({
            select: {
                Employee_RoleContract: {
                    where: {
                        companyId: locals.company.id,
                        NOT: [
                            { id: locals.employee.employeeId }
                        ]
                    },
                    orderBy: {
                        date: 'desc',
                    },
                    take: 1,
                    select: {
                        contract: {
                            select: {
                                dailyHours: true,
                            }
                        }
                    }
                },
                name: true,
                Activity: {
                    where: {
                        AND: [
                            { maxDate: { lte: fechaFin } },
                            { maxDate: { gte: fechaInicio } },
                        ],
                    },
                    select: {
                        hours: true,
                        assignedActivityId: true,
                        completed: true
                    }
                },
                AssignedActivitiesTo: {
                    where: {
                        AND: [
                            { maxDate: { lte: fechaFin } },
                            { maxDate: { gte: fechaInicio } },
                        ],
                    }
                }
            }
        });

        if (empleados.length === 0) {
            throw invalid(400, { reporte: [] })
        }


        let reporte = empleados.map(e => {

            let fila = {
                empleado: e.name,
                horasEsperadas: 0,
                horasTrabajadas: 0,
                actividadesFinalizadas: 0,
                actividadesProceso: 0,
                actividadesOrdenadas: 0,
                calificacion: 0,
                color: '#fff',
            };

            var diff = Math.abs(fechaInicio.getTime() - fechaFin.getTime());
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

            fila.horasEsperadas = e.Employee_RoleContract[0].contract.dailyHours * diffDays;

            e.Activity.forEach(a => {
                fila.horasTrabajadas += a.hours;
            })

            let actividadesNoOrdenadasFinalizadas = 0;
            let actividadesNoOrdenadasEnProgreso = 0;

            e.Activity.forEach(a => {
                if (a.completed) {
                    fila.actividadesFinalizadas += 1;
                    if (a.assignedActivityId === null) {
                        actividadesNoOrdenadasFinalizadas += 1;
                    }
                }
                else {
                    fila.actividadesProceso += 1;
                    if (a.assignedActivityId === null) {
                        actividadesNoOrdenadasEnProgreso += 1;
                    }
                }
            });

            let actividadesOrdenadasFinalizadas = 0;
            let actividadesOrdenadasNoFinalizadas = 0;

            e.AssignedActivitiesTo.forEach(a => {
                fila.actividadesOrdenadas += 1;

                if (a.completed) {
                    actividadesOrdenadasFinalizadas += 1;
                }
                else {
                    actividadesOrdenadasNoFinalizadas += 1;
                }
            })

            const calificacionHoras = 0.45 * fila.horasTrabajadas / fila.horasEsperadas;
            const calificacionActividadesNum = 0.55 * (actividadesOrdenadasFinalizadas + actividadesNoOrdenadasFinalizadas);
            const calificacionActividadesDen = actividadesNoOrdenadasFinalizadas + actividadesNoOrdenadasEnProgreso + actividadesOrdenadasFinalizadas + actividadesOrdenadasNoFinalizadas;
            const calificacionActividades = calificacionActividadesNum / calificacionActividadesDen;

            fila.calificacion = (calificacionHoras + calificacionActividades);
            fila.calificacion *= 100;

            if (isNaN(fila.calificacion)) {
                fila.calificacion = 0;
            }

            fila.calificacion = Math.round(fila.calificacion);

            if (fila.calificacion >= 90) {
                fila.color = '#7eff28';
            }
            else if (fila.calificacion >= 80) {
                fila.color = '#caff43';
            }
            else if (fila.calificacion >= 70) {
                fila.color = '#fffc58';
            }
            else if (fila.calificacion >= 50) {
                fila.color = '#ffbc35';
            }
            else {
                fila.color = '#ff9481';
            }

            return fila;
        });

        return {
            reporte
        }
    }
}