import * as types from './types';
import { GetHeaderDataAPI } from "../api-services/TablePageApi";
import { GetTableDataAPI } from "../api-services/TablePageApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const GetHeaderDataAction = (callback) => {
    GenerateSaga(types.GET_HEADER_DATA_ACTION, GetHeaderDataAPI);
  return {
    type: types.GET_HEADER_DATA_ACTION,
    callback
  }
};

export const GetTableDataAction = (callback) => {
  GenerateSaga(types.GET_TABLE_DATA_ACTION, GetTableDataAPI);
  return {
    type: types.GET_TABLE_DATA_ACTION,
    callback
  }
};