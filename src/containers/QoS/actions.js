import { createAction } from "redux-actions";
import createAsyncAction from "../../helpers/createAsyncActions";

export const { getQOSAsync } = createAsyncAction('getQOSAsync');
export const getQOSSuccess = createAction('GET_QOS_SUCCESS');
export const getQOSFail = createAction('GET_QOS_FAIL');
