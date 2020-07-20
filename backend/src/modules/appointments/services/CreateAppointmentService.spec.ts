import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

// Categorização
describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123'
        });

        expect(appointment).toHaveProperty('id');
    });

    // it('should not be able to create two appointments on the same time', () => {
        
    // });
});