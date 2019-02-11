/*
 *
 * MessagesTab reducer
 *
 */

import { fromJS } from 'immutable';
import * as ActionTypes from './constants';

export const initialState = fromJS({
  data: [],
  loading: false,
  loaded: false,
  error: null,
});

function messagesTabReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      return state.set('loading', true).set('loaded', false);
    case ActionTypes.GET_MESSAGES_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('data', action.data);
    case ActionTypes.GET_MESSAGES_FAIL:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default messagesTabReducer;
