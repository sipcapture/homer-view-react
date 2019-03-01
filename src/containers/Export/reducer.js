import { handleActions } from "redux-actions";
import { getExportPcapAsync, getExportTxtAsync } from "./actions";
import { Record } from "immutable";

const initialState = {
  pcap: "",
  txt: "",
  loading: false,
  loaded: false,
  error: null
};

const handleGetExportTxtAsyncSuccess = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: true,
    txt: payload,
    pcap: state.pcap
  });
};

const handleGetExportPcapAsyncSuccess = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: true,
    pcap: payload,
    txt: state.txt
  });
};

const handleGetExportTxtAsyncFail = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: false,
    error: payload.data
  });
};

const handleGetExportPcapAsyncFail = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: false,
    error: payload.data
  });
};

export default handleActions(
  {
    [getExportTxtAsync.success]: handleGetExportTxtAsyncSuccess,
    [getExportPcapAsync.success]: handleGetExportPcapAsyncSuccess,
    [getExportTxtAsync.fail]: handleGetExportTxtAsyncFail,
    [getExportPcapAsync.fail]: handleGetExportPcapAsyncFail
  },
  initialState
);
