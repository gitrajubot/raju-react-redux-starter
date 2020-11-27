import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const GetHeaderDataAPI = async () => {
    console.log('In api', getUrl(routers.getheaderData))
    return await AxiosService.get(getUrl(routers.getheaderData));
};

export const GetTableDataAPI = async () => {
    console.log('In api', getUrl(routers.gettableData))
    return await AxiosService.get(getUrl(routers.gettableData));
};