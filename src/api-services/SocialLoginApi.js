import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const SocialLoginAPI = async (data) => {
    console.log('In api', getUrl(routers.login),data.data)
    return await AxiosService.post(getUrl(routers.login),data.data);
};