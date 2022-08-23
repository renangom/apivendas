import Handlebars from "handlebars";
import fs from 'fs'
//DEFININDO TIPAGEM DINÂMICA
interface ITemplateVariables{
  [key: string]: string | number;
}

interface IParseMailTemplate{
  file: string,
  variables: ITemplateVariables
}

class handlebarsMailTemplate {
  public async parse({file, variables}:IParseMailTemplate):Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {encoding: 'utf-8'})
    const parseTemplate = Handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default handlebarsMailTemplate;
