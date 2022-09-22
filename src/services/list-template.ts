import axios from 'axios';

export async function listTemplateService(): Promise<string[]> {
    const { data } = await axios.get(`${process.env.REACT_APP_MJML_CMS_API_URL}/list-template`);

    return data;
}
