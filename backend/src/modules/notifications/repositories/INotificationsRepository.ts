import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

interface INotificationRepository {
    create(data: ICreateNotificationDTO): Promise<Notification>;
}

export default INotificationRepository;