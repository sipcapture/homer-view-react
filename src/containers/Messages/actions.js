import { createAction } from "redux-actions";
import createAsyncAction from "../../helpers/createAsyncActions";

export const { getMessagesAsync } = createAsyncAction('getMessagesAsync');
export const getMessagesSuccess = createAction('GET_MESSAGES_SUCCESS');
export const getMessagesFail = createAction('GET_MESSAGES_FAIL');
export const updateSidValue = createAction('UPDATE_SID_VALUE');
