/*
 *
 * QoS reducer
 *
 */

import { fromJS } from 'immutable';
import * as ActionTypes from './constants';

export const initialState = fromJS({
  data: [],
  loaded: false,
  loading: false,
  error: false,
});

function qoSReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_QOS_DATA:
      return state.set('loading', true).set('loaded', false);
    case ActionTypes.GET_QOS_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('data', action.data);
    case ActionTypes.GET_QOS_DATA_FAILED:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default qoSReducer;
