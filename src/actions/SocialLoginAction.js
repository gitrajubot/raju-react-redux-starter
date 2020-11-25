import * as types from './types';
import { SocialLoginAPI } from "../api-services/SocialLoginApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const SocialLoginAction = (data, callback) => {
    GenerateSaga(types.SOCIAL_LOGIN_ACTION, SocialLoginAPI);
  return {
    type: types.SOCIAL_LOGIN_ACTION,
    data,
    callback
  }
};

