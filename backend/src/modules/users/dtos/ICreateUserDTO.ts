import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export default ICreateUserDTO;