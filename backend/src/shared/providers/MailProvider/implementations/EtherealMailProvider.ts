import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IFakeMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

/**
 * Provider de email para ambiente de desenvolvimento
 * https://ethereal.email/
 */

 @injectable()
class EtherealMailProvider implements IFakeMailProvider {

    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then(account => {
            this.client = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
        });
    }

    public async sendMail({ to, subject, from, templateData }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com.br'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        })

        console.log('URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;