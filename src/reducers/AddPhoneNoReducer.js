import * as types from '../actions/types';

const AddPhoneNoReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.SOCIAL_LOGIN_ACTION: 
            console.log('in action start');
            return {...state, AddPhoneNoLoading: true};
        case types.SOCIAL_LOGIN_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, AddPhoneNoData: action.response, AddPhoneNoLoading: false}
        case types.SOCIAL_LOGIN_ACTION + '_ERROR':
            return {...state, AddPhoneNoErr: action.error, AddPhoneNoLoading: undefined}
        default:
            return state;
    }
}

export default AddPhoneNoReducer;