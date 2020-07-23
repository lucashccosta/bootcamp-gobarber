import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the month availability providers', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            date: new Date(2020, 4, 20, 8, 0, 0) //20/MAI/2020 08:00:00
        });

        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            date: new Date(2020, 4, 20, 10, 0, 0) //20/MAI/2020 10:00:00
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: '159753',
            day: 20,
            year: 2020,
            month: 5 //MAI
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: true },
            { hour: 10, available: false },
            { hour: 11, available: true },
        ]));
    });

});