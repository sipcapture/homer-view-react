import { handleActions } from "redux-actions";
import { getMessagesAsync, getMessagesSuccess, getMessagesFail } from "./actions";
import { Record } from "immutable";


const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

const handleGetMessages = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: true, loaded: false});
};

const handleGetMessagesSuccess = (state, { payload }) => {
  console.log('PAY', payload);
  return Object.assign({}, ...state, { loading: false, loaded: true, data: payload.data });
};

const handleGetMessagesFail = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: false, loaded: false, error: payload.data });
};

export default handleActions(
  {
    [getMessagesAsync.success]: handleGetMessagesSuccess,
    [getMessagesAsync.fail]: handleGetMessagesFail,
  },
  initialState
);
