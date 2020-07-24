import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvidersService = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Homem de Ferro',
            email: 'homemdeferro@test.com',
            password: '123456'
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Tanos',
            email: 'tanos@test.com',
            password: '123456'
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Capitao America',
            email: 'capitaoamerica@test.com',
            password: '123456'
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id
        });

        expect(providers).toEqual([
            user1,
            user2
        ]);
    });

});