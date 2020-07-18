import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

const appointmentsRoutes = Router();
const appointmentController = new AppointmentController();

appointmentsRoutes.use(ensureAuthenticated); //todas as rotas irão utilizar o middleware de autenticação

// appointmentsRoutes.get('/', async (req, res) => {
//     const appointments = await appointmentsRepository.find();

//     return res.json(appointments);
// });

appointmentsRoutes.post('/', appointmentController.create);

export default appointmentsRoutes;
