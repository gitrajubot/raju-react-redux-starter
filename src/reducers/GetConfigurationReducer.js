import * as types from '../actions/types';

const GetConfigurationReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.GET_CONFIGURATION_ACTION: 
            console.log('in action start');
            return {...state, configLoading: true};
        case types.GET_CONFIGURATION_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, configData: action.response, configLoading: false}
        case types.GET_CONFIGURATION_ACTION + '_ERROR':
            return {...state, configErr: action.error, configLoading: undefined}
        default:
            return state;
    }
}

export default GetConfigurationReducer;