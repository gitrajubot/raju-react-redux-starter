import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const signUpAPI = async (data) => {
    console.log('In api',  getUrl(routers.emailSignUp),data.data)
    return await AxiosService.post(getUrl(routers.emailSignUp),data.data);
}

export const loginAPI = async (data) => {
    console.log('In api',  getUrl(routers.emailLogin),data.data)
    return await AxiosService.post(getUrl(routers.emailLogin),data.data);
}