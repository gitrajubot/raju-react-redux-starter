import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const AddPhoneNoAPI = async (data) => {
    console.log('In api', getUrl(routers.addPhoneNo),data.data)
    return await AxiosService.post(getUrl(routers.addPhoneNo),data.data);
};