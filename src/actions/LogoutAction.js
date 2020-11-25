import * as types from './types';
import { LogoutAPI } from "../api-services/LogoutApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const LogoutAction = (data, callback) => {
    GenerateSaga(types.LOGOUT_ACTION, LogoutAPI);
  return {
    type: types.LOGOUT_ACTION,
    data,
    callback
  }
};

