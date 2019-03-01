import { createAction } from "redux-actions";
import createAsyncAction from "../../helpers/createAsyncActions";

export const { getQOSAsync } = createAsyncAction("getQOSAsync");
export const getQOSSuccess = createAction("GET_QOS_SUCCESS");
export const getQOSFail = createAction("GET_QOS_FAIL");

export const toggleSelection = createAction("TOGGLE_SELECTION");
export const toggleSidSelection = createAction("TOGGLE_SID_SELECTION");
