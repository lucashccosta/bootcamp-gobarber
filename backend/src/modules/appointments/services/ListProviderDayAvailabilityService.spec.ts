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

    it('should be able to list the day availability providers', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            user_id: '951753',
            date: new Date(2020, 4, 20, 14, 0, 0) //20/MAI/2020 14:00:00
        });

        await fakeAppointmentsRepository.create({
            provider_id: '159753',
            user_id: '951753',
            date: new Date(2020, 4, 20, 15, 0, 0) //20/MAI/2020 15:00:00
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime(); //20/MAI/2020 11:00:00
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: '159753',
            day: 20,
            year: 2020,
            month: 5 //MAI
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
        ]));
    });

});