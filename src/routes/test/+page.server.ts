import type { PageServerLoad } from './$types'
import { db } from '$lib/database/GerenciaDB'
import { invalid, type Action, type Actions, redirect } from '@sveltejs/kit';


const Clientes = [
    { id: 101, nombre: 'Udla' },
    { id: 102, nombre: 'Supermaxi' },
    { id: 103, nombre: 'Cigarra' },
    { id: 104, nombre: 'Whatever' },
];

const Contratos = [
    { id: 1, idCliente: 101, Nombre: 'Tour Virtual', Montos: 4000, Fecha: new Date('2023/1/1') },
    { id: 1, idCliente: 102, Nombre: 'SEO Website', Montos: 2000, Fecha: new Date('2023/1/2') },
    { id: 1, idCliente: 103, Nombre: 'Nueva App Movil', Montos: 6000, Fecha: new Date('2023/1/3') },
    { id: 1, idCliente: 104, Nombre: 'Facturacion Electronica', Montos: 2500, Fecha: new Date('2023/1/4') },
    { id: 1, idCliente: 101, Nombre: 'Proyecto de Software', Montos: 10000, Fecha: new Date('2023/1/4') },
];

export const actions: Actions = {
    search: async ({ request, params, locals }) => {

        const data = await request.formData();

        const fechaInicioStr = data.get('start-date')?.toString();
        if (!fechaInicioStr) {
            return invalid(400, { missing: true });
        }
        const fechaInicio = new Date(fechaInicioStr);

        const fechaFinStr = data.get('end-date')?.toString();
        if (!fechaFinStr) {
            return invalid(400, { missing: true });
        }
        const fechaFin = new Date(fechaFinStr);


        console.log(fechaInicio, fechaFin);

        var contratos = Contratos
            .filter(c => c.Fecha >= fechaInicio && c.Fecha <= fechaFin)
            .map(c => {

                var cliente = Clientes.filter(cl => cl.id === c.idCliente)[0];
                return {
                    fecha: c.Fecha,
                    tipo: cliente.nombre,
                    valor: c.Montos,
                };
            });

        return { valores: contratos };

    }
}