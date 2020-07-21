import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

export default IMailProvider;