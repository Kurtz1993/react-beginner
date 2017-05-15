import * as types from '../actions/action-types';
import initialState from './initial-state';

function actionTypeEndsInSuccess(type) {
  return type.includes('_SUCCESS');
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === types.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}