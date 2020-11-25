import * as types from './types';
import { GetProfileAPI, editProfileAPI } from "../api-services/GetProfileApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const GetProfileAction = (data, callback) => {
    GenerateSaga(types.GET_PROFILE_ACTION, GetProfileAPI);
  return {
    type: types.GET_PROFILE_ACTION,
    data,
    callback
  }
};

export const editProfileAction = (data, callback) => {
  GenerateSaga(types.EDIT_PROFILE_ACTION, editProfileAPI);
return {
  type: types.EDIT_PROFILE_ACTION,
  data,
  callback
}
};

