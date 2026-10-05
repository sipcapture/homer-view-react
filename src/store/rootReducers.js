import { combineReducers } from "redux-immutable";

import messages from "../containers/Messages/reducer";
import qos from "../containers/QoS/reducer";
import flow from "../containers/Flow/reducer";
import logs from "../containers/Logs/reducer";
import exports from "../containers/Export/reducer";

// The `routing` slice came from react-router-redux, which is unmaintained
// and has no React 18-compatible successor. The router keeps its state
// internally now, so the slice is gone.
const reducers = combineReducers({
  messages,
  qos,
  flow,
  logs,
  exports
});

export default reducers;