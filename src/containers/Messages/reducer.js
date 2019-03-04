import { handleActions } from "redux-actions";
import {
  getMessagesAsync,
} from "./actions";

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};

const handleGetMessagesSuccess = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: true,
    data: payload.data
  });
};

const handleGetMessagesFail = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: false,
    error: payload.data
  });
};

const handleUpdateSidValue = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: false,
    error: payload.data
  });
};

export default handleActions(
  {
    [getMessagesAsync.success]: handleGetMessagesSuccess,
    [getMessagesAsync.fail]: handleGetMessagesFail,
    updateSidValue: handleUpdateSidValue
  },
  initialState
);
