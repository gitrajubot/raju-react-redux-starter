import * as types from '../actions/types';

const OtpVerificationReducer = function (state = [], action) {
    const response = action.response;
    console.log('in default', action)
    switch (action.type) {
        case types.OTP_VERIFICATION_ACTION:
            console.log('in action start');
            return { ...state, OtpVerificationLoading: true };
        case types.OTP_VERIFICATION_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return { ...state, OtpVerificationData: action.response, OtpVerificationLoading: false }
        case types.OTP_VERIFICATION_ACTION + '_ERROR':
            return { ...state, OtpVerificationErr: action.error.statusText, OtpVerificationLoading: undefined }

        case types.RESEND_OTP_ACTION:
            console.log('in action start');
            return { ...state, ResendOtpLoading: true };
        case types.RESEND_OTP_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return { ...state, ResendOtpData: action.response, ResendOtpLoading: false }
        case types.RESEND_OTP_ACTION + '_ERROR':
            return { ...state, ResendOtpErr: action.error, ResendOtpLoading: undefined }

        default:
            console.log('default return');
            
            return state;
    }
}

export default OtpVerificationReducer;