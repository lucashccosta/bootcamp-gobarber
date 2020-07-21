import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
    it('should be able to update avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        });

        await updateUserAvatarService.execute({
            userId: user.id,
            avatarFilename: 'avatar.jpg'
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );

        await expect(updateUserAvatarService.execute({
            userId: 'non-existing-user',
            avatarFilename: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        });

        await updateUserAvatarService.execute({
            userId: user.id,
            avatarFilename: 'avatar.jpg'
        });

        await updateUserAvatarService.execute({
            userId: user.id,
            avatarFilename: 'avatar2.jpg'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });

});