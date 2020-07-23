import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    private appointmentsRepository: IAppointmentsRepository;

    private notificationsRepository: INotificationsRepository;

    constructor(
        @inject('AppointmentsRepository')
        appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        notificationsRepository: INotificationsRepository
    ) {
        this.appointmentsRepository = appointmentsRepository;
        this.notificationsRepository = notificationsRepository;
    }

    public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError('You can not create an appointment on a past date.');
        }

        if(user_id === provider_id) {
            throw new AppError('You can not create an appoitment with yourself.');
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError('You can only create appointments between 8am and 5pm.');
        }

        const findAppointment = await this.appointmentsRepository.findByDate(appointmentDate);
        
        if(findAppointment) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        });

        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormatted}`
        });

        return appointment;
    }
}

export default CreateAppointmentService;