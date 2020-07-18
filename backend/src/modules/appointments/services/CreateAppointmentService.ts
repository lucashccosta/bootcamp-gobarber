import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    private appointmentsRepository: IAppointmentsRepository;

    constructor(
        @inject('AppointmentsRepository')
        appointmentsRepository: IAppointmentsRepository
    ) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        const findAppointment = await this.appointmentsRepository.findByDate(appointmentDate);
        
        if(findAppointment) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date
        });

        return appointment;
    }
}

export default CreateAppointmentService;