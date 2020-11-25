import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const GetConfigurationAPI = async () => {
    console.log('In api', getUrl(routers.getconfig))
    return await AxiosService.get(getUrl(routers.getconfig));
};