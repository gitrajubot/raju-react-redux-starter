import * as types from '../actions/types';

const SocialLoginReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.SOCIAL_LOGIN_ACTION: 
            console.log('in action start');
            return {...state, SocialLoginLoading: true};
        case types.SOCIAL_LOGIN_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, SocialLoginData: action.response, SocialLoginLoading: false}
        case types.SOCIAL_LOGIN_ACTION + '_ERROR':
            return {...state, SocialLoginErr: action.error, SocialLoginLoading: undefined}
        default:
            return state;
    }
}

export default SocialLoginReducer;