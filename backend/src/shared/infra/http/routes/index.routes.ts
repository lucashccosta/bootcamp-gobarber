import { Router } from 'express';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRoutes from '@modules/users/infra/http/routes/passwords.routes';
import profileRoutes from '@modules/users/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/passwords', passwordsRoutes);
routes.use('/profile', profileRoutes);

export default routes;