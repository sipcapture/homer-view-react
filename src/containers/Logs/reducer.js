import { handleActions } from "redux-actions";
import { getLogsAsync } from "./actions";

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

const handleGetLogs = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: true, loaded: false});
};

const handleGetLogsSuccess = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: false, loaded: true, data: payload.data });
};

const handleGetLogsFail = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: false, loaded: false, error: payload.data });
};

export default handleActions(
  {
    [getLogsAsync.success]: handleGetLogsSuccess,
    [getLogsAsync.fail]: handleGetLogsFail,
  },
  initialState
);
