import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const LogoutAPI = async (data) => {
    console.log('In api', getUrl(routers.logout),data.data)
    return await AxiosService.post(getUrl(routers.logout),data.data);
};