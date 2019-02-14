import { combineReducers } from "redux-immutable";
import { routerReducer as routing } from "react-router-redux";

import messages from "../containers/Messages/reducer";

const reducers = combineReducers({
  routing,
  messages
});

export default reducers;
