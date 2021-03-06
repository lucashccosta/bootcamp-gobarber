import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {

    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id; //usuário logado
        const { provider_id, date } = request.body;

        // const parsedDate = parseISO(date);

        //resolve a dependencia de new CreateAppointmentService
        const createAppointment = container.resolve(CreateAppointmentService); 
        
        const appointment = await createAppointment.execute({ 
            provider_id, 
            user_id, 
            date
        });

        return response.json(appointment);
    }
}

export default AppointmentController;