import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(template, {
            encoding: 'utf-8'
        });

        const parseTemplate = handlebars.compile(templateFileContent);
        
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;