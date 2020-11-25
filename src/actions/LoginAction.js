import * as types from "./types";
import { signUpAPI, loginAPI } from "./../api-services/LoginApi";
import { GenerateSaga } from '../services/sagaGenerator.service';



export const signUpAction = (data, callback) => {
    GenerateSaga(types.SIGN_UP_ACTION, signUpAPI);
  return {
    type: types.SIGN_UP_ACTION,
    data,
    callback
  }
};

export const loginAction = (data, callback) => {
    GenerateSaga(types.LOGIN_ACTION, loginAPI);
  return {
    type: types.LOGIN_ACTION,
    data,
    callback
  }
};