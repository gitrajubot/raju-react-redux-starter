import * as types from '../actions/types';

const TablePageReducer = function(state = [], action) {
    const response = action.response;
    console.log('in default', action.type)
    switch(action.type) {
        case types.GET_HEADER_DATA_ACTION: 
            console.log('in action start');
            return {...state, headerDataLoading: true};
        case types.GET_HEADER_DATA_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, headerData: action.response, headerDataLoading: false}
        case types.GET_HEADER_DATA_ACTION + '_ERROR':
            return {...state, headerDataErr: action.error, headerDataLoading: undefined}
        case types.GET_TABLE_DATA_ACTION: 
            console.log('in action start');
            return {...state, tableDataLoading: true};
        case types.GET_TABLE_DATA_ACTION + '_SUCCESS':
            console.log('in action success', action)
            return {...state, tableData: action.response, tableDataLoading: false}
        case types.GET_TABLE_DATA_ACTION + '_ERROR':
            return {...state, tableDataErr: action.error, tableDataLoading: undefined}    
        default:
            return state;
    }
}

export default TablePageReducer;