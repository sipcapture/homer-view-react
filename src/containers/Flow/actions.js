import { createAction } from "redux-actions";
import createAsyncAction from "../../helpers/createAsyncActions";

export const { getFlowAsync } = createAsyncAction("getFlowAsync");
