import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Doe Mod',
            email: 'john.doe@test.com'
        });

        expect(updatedUser.name).toBe('John Doe Mod');
        expect(updatedUser.email).toBe('john.doe@test.com');
    });

    it('should not be able to update the profile from non-existing user', async () => {
        await expect(updateProfileService.execute({
            user_id: 'non-existing-user',
            name: 'John Doe',
            email: 'johndoe@test.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Iron Man',
            email: 'ironman@test.com',
            password: '123456'
        });

        const user = await fakeUsersRepository.create({
            name: 'Tanos',
            email: 'tanos@test.com',
            password: '123456'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Tanos',
            email: 'ironman@test.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Doe Mod',
            email: 'john.doe@test.com',
            old_password: '123456',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Tanos',
            email: 'tanos@test.com',
            password: '123456'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Tanos',
            email: 'tanos@test.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Tanos',
            email: 'tanos@test.com',
            password: '123456'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Tanos',
            email: 'tanos@test.com',
            password: '123123',
            old_password: 'wrong-old-password'
        })).rejects.toBeInstanceOf(AppError);
    });

});