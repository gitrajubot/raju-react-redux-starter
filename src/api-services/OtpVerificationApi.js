import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const OtpVerificationAPI = async (data) => {
    console.log('In api', getUrl(routers.otpVerification),data.data)
    return await AxiosService.post(getUrl(routers.otpVerification),data.data);
};

export const ResendOtpAPI = async (data) => {
    console.log('In api', getUrl(routers.resendOtp),data.data)
    return await AxiosService.post(getUrl(routers.resendOtp),data.data);
};