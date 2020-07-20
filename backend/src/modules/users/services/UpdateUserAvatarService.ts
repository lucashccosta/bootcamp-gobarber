import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(userId);
        if(!user) {
            throw new AppError('Only authenticated can change avatar.', 401);
        }

        // Deletar avatar anterior
        if(user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;
        await this.usersRepository.update(user);

        return user;
    }
}

export default UpdateUserAvatarService;