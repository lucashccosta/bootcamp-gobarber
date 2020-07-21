import IParseMailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;