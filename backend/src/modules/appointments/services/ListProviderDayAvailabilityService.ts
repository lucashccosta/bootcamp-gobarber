import { injectable, inject } from 'tsyringe';
import { getHours, isAfter }  from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}
    
    public async execute({ provider_id, year, month, day }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id, 
            year, 
            month, 
            day
        });
        
        const hourStart = 8; // primeira hora de agendamento
        const eachHourArray = Array.from(
            { length: 10 }, //8-18h só é permitido 10 agendamentos
            (_, index) => index + hourStart
        );

        const currentDate = new Date(Date.now());
        const availability = eachHourArray.map(hour => {
            //verifica se existe algum agendamento no horário
            const hasAppointmentInHour = appointments.find(appointment => 
                getHours(appointment.date) === hour
            ); 

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate) //data depois do horário corrente
            };
        });

        return availability;
    }
}

export default ListProviderDayAvailabilityService;