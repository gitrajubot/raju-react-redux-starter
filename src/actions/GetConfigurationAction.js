import * as types from './types';
import { GetConfigurationAPI } from "../api-services/GetConfigurationApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const GetConfigurationAction = (callback) => {
    GenerateSaga(types.GET_CONFIGURATION_ACTION, GetConfigurationAPI);
  return {
    type: types.GET_CONFIGURATION_ACTION,
    callback
  }
};