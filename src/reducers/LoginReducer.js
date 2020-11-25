import * as types from '../actions/types';

const LoginReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.SIGN_UP_ACTION: 
            console.log('in action start');
            return {...state, signUpLoading: true};
        case types.SIGN_UP_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, signUpData: action.response, signUpLoading: false}
        case types.SIGN_UP_ACTION + '_ERROR':
            return {...state, signUpErr: action.error, signUpLoading: undefined}
        case types.LOGIN_ACTION: 
            console.log('in action start');
            return {...state, loginLoading: true};
        case types.LOGIN_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, loginData: action.response, loginLoading: false}
        case types.LOGIN_ACTION + '_ERROR':
            return {...state, loginErr: action.error, loginLoading: undefined}            
        default:
            return state;
    }
}

export default LoginReducer;