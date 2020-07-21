import IFakeMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

class FakeMailProvider implements IFakeMailProvider {
    private messages: ISendMailDTO[] = [];

    public async sendMail(data: ISendMailDTO): Promise<void> {
        this.messages.push(data);
    }
}

export default FakeMailProvider;