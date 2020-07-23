import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRoutes = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated); //todas as rotas irão utilizar o middleware de autenticação

appointmentsRoutes.post('/', appointmentController.create);
appointmentsRoutes.get('/me', providerAppointmentsController.index);

export default appointmentsRoutes;
