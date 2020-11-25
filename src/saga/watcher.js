import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/types';

export const actionArr = []
let actionLength = 0;
export function* watchActions() {
  // Declare every saga here with the action type
  // Ex:  yield takeLatest(types.ACTION_TYPE, sagaGeneratorFunction);
  if (actionArr.length && actionLength != actionArr.length) {
    actionLength = actionArr.length;
  let lastIndex = actionArr.length - 1;
  yield takeEvery(actionArr[lastIndex].actionType, actionArr[lastIndex].sagaFunc)
  }
  for(let i in actionArr) {
    //yield cancel(actionArr[i].actionType);
    //yield delay(500)
    //yield takeEvery(actionArr[i].actionType, actionArr[i].sagaFunc)
  }
}




