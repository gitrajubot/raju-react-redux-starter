import { combineReducers } from 'redux';
import GetHeaderDataReducer from './TablePageReducer';
import GetTableDataReducer from './TablePageReducer';





const rootReducer = combineReducers({
    GetHeaderDataReducer,
    GetTableDataReducer
})

export default rootReducer;