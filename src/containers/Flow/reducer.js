import { handleActions } from "redux-actions";
import { getFlowAsync } from "./actions";
import { Record } from "immutable";

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};

const handleGetFlow = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: true, loaded: false });
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
    error: payload.data
  });
};

export default handleActions(
  {
    [getFlowAsync.success]: handleGetFlowAsyncSuccess,
    [getFlowAsync.fail]: handleGetFlowAsyncFail
  },
  initialState
);
