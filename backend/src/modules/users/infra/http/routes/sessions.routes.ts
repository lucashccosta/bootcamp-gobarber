import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
        email,
        password
    });

    delete user.password;

    return res.json({ user, token });
});

export default sessionsRoutes;
