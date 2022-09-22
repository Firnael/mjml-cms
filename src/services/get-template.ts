import axios from 'axios';
import { IGetTemplateRequest, IGetTemplateResponse } from '../types/service';

export async function getTemplateService(template: string, templateData: any = {}): Promise<IGetTemplateResponse> {
    const { data } = await axios.post(
        `${process.env.REACT_APP_MJML_CMS_API_URL}/get-template`,
        {
            template,
            data: templateData
        } as IGetTemplateRequest
    );

    return data;
}
