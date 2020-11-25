import * as types from '../actions/types';

const PasswordReducer = function (state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch (action.type) {

        case types.EMAIL_VERIFICATION_ACTION:
            console.log('in action start');
            return { ...state, EmailVerifyLoading: true };
        case types.EMAIL_VERIFICATION_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return { ...state, EmailVerifyData: action.response, EmailVerifyLoading: false }
        case types.EMAIL_VERIFICATION_ACTION + '_ERROR':
            return { ...state, EmailVerifyErr: action.error, EmailVerifyLoading: undefined }


        case types.FORGET_PASSWORD_ACTION:
            console.log('in action start');
            return { ...state, ForgetPasswordLoading: true };
        case types.FORGET_PASSWORD_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return { ...state, ForgetPasswordData: action.response, ForgetPasswordLoading: false }
        case types.FORGET_PASSWORD_ACTION + '_ERROR':
            return { ...state, ForgetPasswordErr: action.error, ForgetPasswordLoading: undefined }


        case types.RESET_PASSWORD_ACTION:
            console.log('in action start');
            return { ...state, ResetPasswordLoading: true };
        case types.RESET_PASSWORD_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return { ...state, ResetPasswordData: action.response, ResetPasswordLoading: false }
        case types.RESET_PASSWORD_ACTION + '_ERROR':
            return { ...state, ResetPasswordErr: action.error, ResetPasswordLoading: undefined }


        default:
            return state;
    }
}

export default PasswordReducer;