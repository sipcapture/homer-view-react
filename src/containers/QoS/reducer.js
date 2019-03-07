import { handleActions } from "redux-actions";
import {
  getQOSAsync,
  toggleSelection,
  toggleSidSelection
} from "./actions";
import formatQOSResponse from "../../normalazers/formatQOSResponse";
import _ from "lodash";

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: false
};

const handleGetQOSSuccess = (state, { payload }) => {
  const sortedData = _.orderBy(payload.data, "create_date", "asc");

  return Object.assign({}, ...state, {
    loading: false,
    loaded: true,
    data: payload.data,
    graphs: _.cloneDeep(formatQOSResponse(sortedData).bySid)
  });
};

const handleGetQOSFail = (state, { payload }) => {
  return Object.assign({}, ...state, {
    loading: false,
    loaded: false,
    error: true,
  });
};

const handleToggleSelection = (state, { payload }) => {
  state.graphs[payload.sid].values[payload.option].selected = !state.graphs[
    payload.sid
  ].values[payload.option].selected;
  return Object.assign({}, state);
};

const handleSidSelection = (state, { payload }) => {
  state.graphs[payload.sid].selected = !state.graphs[payload.sid].selected;
  for (let key in state.graphs[payload.sid].values) {
    state.graphs[payload.sid].values[key].selected =
      state.graphs[payload.sid].selected;
  }
  return Object.assign({}, state);
};

export default handleActions(
  {
    [getQOSAsync.success]: handleGetQOSSuccess,
    [getQOSAsync.fail]: handleGetQOSFail,
    [toggleSelection]: handleToggleSelection,
    [toggleSidSelection]: handleSidSelection
  },
  initialState
);
