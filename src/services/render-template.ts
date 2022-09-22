import dot from 'dot';
import { IRenderTemplateRequest, IRenderTemplateResponse } from '../types/service';
import mjml2html from 'mjml-browser'

export async function renderTemplateService(renderTemplateRequest: IRenderTemplateRequest): Promise<IRenderTemplateResponse> {
    console.log('Templating with doT');
    const templateFunction = dot.template(renderTemplateRequest.mjml);
    const templated = templateFunction(renderTemplateRequest.data);

    console.log('Converting MJML to HTML');
    const options = {};
    const output = mjml2html(templated, options);

    console.log('Template rendered successfully');
    const result = {
        html: output.html,
        errors: [] //npoutput.errors,
    }
    return result;
}