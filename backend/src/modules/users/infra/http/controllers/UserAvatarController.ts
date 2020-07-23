import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatarService.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename
        });

        delete user.password;

        return response.json(classToClass(user));
    }

}

export default UserAvatarController;