import { combineReducers } from "redux-immutable";
import { routerReducer as routing } from "react-router-redux";

import messages from "../containers/Messages/reducer";
import qos from "../containers/QoS/reducer";

const reducers = combineReducers({
  routing,
  messages,
  qos
});

export default reducers;
