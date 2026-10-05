import "regenerator-runtime/runtime";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "./rootSagas";
import reducers from "./rootReducers";

const sagaMiddleware = createSagaMiddleware();

// react-router-redux's routerMiddleware/history are gone; the router now
// keeps its own history inside BrowserRouter (see src/App/index.js).
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;