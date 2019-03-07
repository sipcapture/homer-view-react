import { handleActions } from "redux-actions";
import { getFlowAsync } from "./actions";

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: false
};

const handleGetFlowAsyncSuccess = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: true,
    data: payload.data
  });
};

const handleGetFlowAsyncFail = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: false,
    error: true
  });
};

export default handleActions(
  {
    [getFlowAsync.success]: handleGetFlowAsyncSuccess,
    [getFlowAsync.fail]: handleGetFlowAsyncFail
  },
  initialState
);
