/*
 *
 * MessagesTab actions
 *
 */

import * as ActionTypes from './constants';

export function getMessagesAction(data) {
  return {
    type: ActionTypes.GET_MESSAGES,
    data,
  };
}
