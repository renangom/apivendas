import Handlebars from "handlebars";

//DEFININDO TIPAGEM DINÂMICA
interface ITemplateVariables{
  [key: string]: string | number;
}

interface IParseMailTemplate{
  template: string,
  variables: ITemplateVariables
}

class handlebarsMailTemplate {
  public async parse({template, variables}:IParseMailTemplate):Promise<string> {
    const parseTemplate = Handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default handlebarsMailTemplate;
