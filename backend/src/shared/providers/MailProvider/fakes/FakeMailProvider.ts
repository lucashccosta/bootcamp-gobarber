import IFakeMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

interface IMessage {
    to: string;
    body: string;
}

class FakeMailProvider implements IFakeMailProvider {
    private messages: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body
        });
    }
}

export default FakeMailProvider;