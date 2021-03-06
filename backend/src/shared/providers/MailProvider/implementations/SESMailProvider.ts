import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

/**
 * Provider de email para ambiente de produção utilizando Amazon SES
 */

 @injectable()
class SESMailProvider implements IMailProvider {

    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_DEFAULT_REGION
            })
        });
    }

    public async sendMail({ to, subject, from, templateData }: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;

        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}

export default SESMailProvider;