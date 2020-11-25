import * as types from '../actions/types';

const LogoutReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.LOGOUT_ACTION: 
            console.log('in action start');
            return {...state, LogoutLoading: true};
        case types.LOGOUT_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, LogoutData: action.response, LogoutLoading: false}
        case types.LOGOUT_ACTION + '_ERROR':
            return {...state, LogoutErr: action.error, LogoutLoading: undefined}
        default:
            return state;
    }
}

export default LogoutReducer;