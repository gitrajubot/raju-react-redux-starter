import * as types from './types';
import { OtpVerificationAPI, ResendOtpAPI } from "../api-services/OtpVerificationApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const OtpVerificationAction = (data, callback) => {
    GenerateSaga(types.OTP_VERIFICATION_ACTION, OtpVerificationAPI);
  return {
    type: types.OTP_VERIFICATION_ACTION,
    data,
    callback
  }
};


export const ResendOtpAction = (data, callback) => {
  GenerateSaga(types.RESEND_OTP_ACTION, ResendOtpAPI);
return {
  type: types.RESEND_OTP_ACTION,
  data,
  callback
}
};

