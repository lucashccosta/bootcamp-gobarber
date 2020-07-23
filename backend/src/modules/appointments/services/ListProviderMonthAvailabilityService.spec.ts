import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the month availability providers', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            user_id: '951753',
            date: new Date(2020, 3, 20, 8, 0, 0) //20/ABR/2020 08:00:00
        });

        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            user_id: '951753',
            date: new Date(2020, 4, 20, 8, 0, 0) //20/MAI/2020 08:00:00
        });

        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            user_id: '951753',
            date: new Date(2020, 4, 20, 10, 0, 0) //20/MAI/2020 10:00:00
        });

        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            user_id: '951753',
            date: new Date(2020, 4, 21, 8, 0, 0) //21/MAI/2020 08:00:00
        });

        const availability = await listProviderMonthAvailabilityService.execute({
            provider_id: '159753',
            year: 2020,
            month: 5 //MAI
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 20, available: true },
            { day: 21, available: true },
        ]));
    });

});