import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {

    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id; //usuário logado

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({ user_id });

        return response.json(classToClass(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email, old_password, password } = request.body;
        const user_id = request.user.id; //usuário logado

        const createUser = container.resolve(UpdateProfileService);
        const user = await createUser.execute({
            user_id,
            name,
            email,
            old_password,
            password
        });

        return response.json(classToClass(user));
    }

}

export default ProfileController;