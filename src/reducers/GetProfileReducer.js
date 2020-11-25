import * as types from '../actions/types';

const GetProfileReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.GET_PROFILE_ACTION: 
            console.log('in action start');
            return {...state, GetProfileLoading: true};
        case types.GET_PROFILE_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, GetProfileData: action.response, GetProfileLoading: false}
        case types.GET_PROFILE_ACTION + '_ERROR':
            return {...state, GetProfileErr: action.error, GetProfileLoading: undefined}
        case types.EDIT_PROFILE_ACTION: 
            console.log('in edit profile action start');
            return {...state, EditProfileLoading: true};
        case types.EDIT_PROFILE_ACTION + '_SUCCESS':
            console.log('in edit profile action success', action)
            return {...state, EditProfileData: action.response, EditProfileLoading: false}
        case types.EDIT_PROFILE_ACTION + '_ERROR':
            console.log('in edit profile action error', action)
            return {...state, EditProfileErr: action.error, EditProfileLoading: undefined}            
        default:
            return state;
    }
}

export default GetProfileReducer;