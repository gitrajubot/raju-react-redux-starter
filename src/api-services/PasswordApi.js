import axios from 'axios';
import {getUrl,routers} from './EndPoint'

export const emailVerifyAPI = async (data) => {
    console.log('In api', getUrl(routers.emailVerify),data.data)
    return await axios.post(getUrl(routers.emailVerify),data.data);
}

export const forgotPasswordAPI = async (data) => {
    console.log('In api', getUrl(routers.forgotPassword),data.data)
    return await axios.post(getUrl(routers.forgotPassword),data.data);
}

export const resetPasswordAPI = async (data) => {
    console.log('In api', getUrl(routers.resetPassword),data.data)
    return await axios.post(getUrl(routers.resetPassword)+"/"+localStorage.getItem('UserId'),data.data, {headers: { "jwttoken": localStorage.getItem('JWT')}});
}