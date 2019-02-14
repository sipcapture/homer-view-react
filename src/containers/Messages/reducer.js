/* @flow */
import { handleActions } from "redux-actions";
import { getMessages, getMessagesSuccess, getMessagesFail } from "./actions";
import { Record } from "immutable";


const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

const handleGetMessages = (state, payload) => {
  state.loading = true;
  state.loaded = false;
  return Object.assign({}, state);
};

const handleGetMessagesSuccess = (state, payload) => {
  state.loading = false;
  state.loaded = true;
  state.data = payload.data;
  return Object.assign({}, state);
};

const handleGetMessagesFail = (state, payload) => {
  state.loading = false;
  state.loaded = false;
  state.error = payload.error;
  return Object.assign({}, state);
};

export default handleActions(
  {
    [getMessages]: handleGetMessages,
    [getMessagesSuccess]: handleGetMessagesSuccess,
    [getMessagesFail]: handleGetMessagesFail,
  },
  initialState
);
