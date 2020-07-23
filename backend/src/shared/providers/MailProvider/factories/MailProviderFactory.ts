import { container } from 'tsyringe';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/providers/MailProvider/implementations/SESMailProvider';

interface IMailDriver {
    driver: 'ethereal' | 'ses'
}

class MailProviderFactory {

    public static create({ driver }: IMailDriver): IMailProvider {
        switch(driver) {
            case 'ses':
                return container.resolve(SESMailProvider);
            default:
                return container.resolve(EtherealMailProvider);
        }
    }
}

export default MailProviderFactory;