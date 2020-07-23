import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate }  from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}
    
    /**
     * RN1: o horário de funcionamento é de 8h-18h
     * RN2: cada horário é de 1h
     */
    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month
        });

        const numberOfDayInMonth = getDaysInMonth(
            new Date(year, (month-1))
        );

        // [1,2,3,4,5,...,30?,31?]
        const eachDayArray = Array.from(
            { length: numberOfDayInMonth },
            (_, index) => index + 1
        );

        const availability = eachDayArray.map(day => {

            //todos os agendamentos de um dia específico
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: appointmentsInDay.length < 10 //informa se existe algum horário livre (máximo de 10 agendamentos por dia)
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;