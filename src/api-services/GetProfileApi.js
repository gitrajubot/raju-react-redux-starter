import { AxiosService } from "./axios.service";
import {getUrl,routers} from './EndPoint'


export const GetProfileAPI = async (userId) => {
    console.log('In api', getUrl(routers.getProfile)+'?_id='+userId.data)
    return await AxiosService.get(getUrl(routers.getProfile)+'/'+localStorage.getItem('UserId'), {headers: { "jwttoken": localStorage.getItem('JWT')}});
};

export const editProfileAPI = async (data) => {
    console.log('In editprogile api', getUrl(routers.editProfile),data.data)
    return await AxiosService.put(getUrl(routers.editProfile)+'/'+localStorage.getItem('UserId'),data.data,{headers: {
        "Content-type": "multipart/form-data",
        "jwttoken": localStorage.getItem('JWT')
    }} );
};