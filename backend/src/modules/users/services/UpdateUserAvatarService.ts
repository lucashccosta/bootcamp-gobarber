import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {

    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(userId);
        if(!user) {
            throw new AppError('Only authenticated can change avatar.', 401);
        }

        // Deletar avatar anterior
        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await this.usersRepository.update(user);

        return user;
    }
}

export default UpdateUserAvatarService;