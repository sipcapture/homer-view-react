import { handleActions } from "redux-actions";
import { getQOSAsync, getQOSFail, getQOSSuccess } from "./actions";
import { Record } from "immutable";


const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

const handleGetQOSMessages = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: true, loaded: false});
};

const handleGetQOSSuccess = (state, { payload }) => {
  console.log('PAY', payload);
  return Object.assign({}, ...state, { loading: false, loaded: true, data: payload.data });
};

const handleGetQOSFail = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: false, loaded: false, error: payload.data });
};

export default handleActions(
  {
    [getQOSAsync.success]: handleGetQOSSuccess,
    [getQOSAsync.fail]: handleGetQOSFail,
  },
  initialState
);
