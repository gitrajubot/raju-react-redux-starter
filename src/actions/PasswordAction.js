import * as types from './types';
import { emailVerifyAPI, forgotPasswordAPI, resetPasswordAPI } from "../api-services/PasswordApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const ForgetPasswordAction = (data, callback) => {
    GenerateSaga(types.FORGET_PASSWORD_ACTION, forgotPasswordAPI);
  return {
    type: types.FORGET_PASSWORD_ACTION,
    data,
    callback
  }
};


export const EmailVerifyAction = (data, callback) => {
    GenerateSaga(types.EMAIL_VERIFICATION_ACTION, emailVerifyAPI);
  return {
    type: types.EMAIL_VERIFICATION_ACTION,
    data,
    callback
  }
};


export const ResetPasswordAction = (data, callback) => {
    GenerateSaga(types.RESET_PASSWORD_ACTION, resetPasswordAPI);
  return {
    type: types.RESET_PASSWORD_ACTION,
    data,
    callback
  }
};
