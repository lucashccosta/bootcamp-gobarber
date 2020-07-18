import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();
appointmentsRoutes.use(ensureAuthenticated); //todas as rotas irão utilizar o middleware de autenticação

appointmentsRoutes.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentsRoutes.post('/', async (req, res) => {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return res.json(appointment);
});

export default appointmentsRoutes;
