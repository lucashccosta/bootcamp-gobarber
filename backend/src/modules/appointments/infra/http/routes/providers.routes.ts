import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '@modules/appointments/infra/http/controllers/ProviderController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

const providersRoutes = Router();
const providerController = new ProviderController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRoutes.use(ensureAuthenticated); 

providersRoutes.get('/', providerController.index);
providersRoutes.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providersRoutes.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default providersRoutes;