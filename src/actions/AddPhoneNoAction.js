import * as types from './types';
import { AddPhoneNoAPI } from "../api-services/AddPhoneNoApi";
import { GenerateSaga } from '../services/sagaGenerator.service';


export const AddPhoneNoAction = (data, callback) => {
    GenerateSaga(types.ADD_PHONE_NO_ACTION, AddPhoneNoAPI);
  return {
    type: types.ADD_PHONE_NO_ACTION,
    data,
    callback
  }
};

