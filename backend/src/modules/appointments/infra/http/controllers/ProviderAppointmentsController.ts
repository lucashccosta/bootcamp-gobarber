import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { parseISO } from 'date-fns';

class ProviderAppointmentsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.body;

        const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService); 
        
        const appointments = await listProviderAppointmentsService.execute({
            provider_id,
            day,
            month,
            year
        });

        return response.json(appointments);
    }
}

export default ProviderAppointmentsController;