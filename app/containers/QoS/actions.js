/*
 *
 * QoS actions
 *
 */

import * as ActionTypes from './constants';

export function getQoSDataAction() {
  return {
    type: ActionTypes.GET_QOS_DATA,
  };
}
