import nodemailer, { Transporter } from 'nodemailer';
import IFakeMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

/**
 * Provider de email para ambiente de desenvolvimento
 * https://ethereal.email/
 */
class EtherealMailProvider implements IFakeMailProvider {

    private client: Transporter;

    constructor() {
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

    public async sendMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: 'Equipe GoBarber <equipe@gobarber.com.br>',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        })

        console.log('URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;