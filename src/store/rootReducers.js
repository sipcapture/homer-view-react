import { combineReducers } from "redux-immutable";
import { routerReducer as routing } from "react-router-redux";

import messages from "../containers/Messages/reducer";
import qos from "../containers/QoS/reducer";
import flow from "../containers/Flow/reducer";

const reducers = combineReducers({
  routing,
  messages,
  qos,
  flow
});

export default reducers;
