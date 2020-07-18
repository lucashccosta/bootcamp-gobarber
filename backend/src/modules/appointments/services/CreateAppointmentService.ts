import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository;

    constructor() {
        this.appointmentsRepository = getCustomRepository(AppointmentsRepository);
    }

    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        const findAppointment = await this.appointmentsRepository.findByDate(appointmentDate);
        
        if(findAppointment) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider_id,
            date
        });

        await this.appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;