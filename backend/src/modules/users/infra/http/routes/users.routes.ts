import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
        name,
        email,
        password
    });

    delete user.password;

    return res.json(user);
});

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename
    });

    delete user.password;

    return res.json(user);
});

export default usersRoutes;
