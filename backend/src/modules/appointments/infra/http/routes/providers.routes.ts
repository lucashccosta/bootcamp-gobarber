import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '@modules/appointments/infra/http/controllers/ProviderController';

const providersRoutes = Router();
const providerController = new ProviderController();

providersRoutes.use(ensureAuthenticated); 

providersRoutes.get('/', providerController.index);

export default providersRoutes;
