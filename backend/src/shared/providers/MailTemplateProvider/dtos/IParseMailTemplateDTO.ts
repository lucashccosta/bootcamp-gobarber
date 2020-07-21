interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplateDTO {
    template: string;
    variables: ITemplateVariables //qualquer tipo de objeto que a chave é string e o valor string ou número
}

export default IParseMailTemplateDTO;