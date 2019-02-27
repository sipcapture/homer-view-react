import { handleActions } from "redux-actions";
import { getQOSAsync, getQOSFail, getQOSSuccess, toggleSelection, toggleSidSelection } from "./actions";
import formatQOSResponse from '../../normalazers/formatQOSResponse';
import { Record } from "immutable";
import _ from "lodash";


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
  const qoS = _.cloneDeep(payload.data);
  const sortedData = _.orderBy(payload.data, 'create_date', 'asc');
  return Object.assign({}, ...state, { loading: false, loaded: true, data: payload.data, graphs: _.cloneDeep(formatQOSResponse(sortedData).bySid) });
};

const handleGetQOSFail = (state, { payload }) => {
  return Object.assign({}, ...state, { loading: false, loaded: false, error: payload.data });
};


const handleToggleSelection = (state, { payload }) => {
  state.graphs[payload.sid].values[payload.option].selected = !state.graphs[payload.sid].values[payload.option].selected;
  return Object.assign({}, state);
};

const handleSidSelection = (state, { payload }) => {
  state.graphs[payload.sid].selected = !state.graphs[payload.sid].selected;
  for (let key in state.graphs[payload.sid].values) {
    state.graphs[payload.sid].values[key].selected = state.graphs[payload.sid].selected;
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
