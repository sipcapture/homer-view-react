import "regenerator-runtime/runtime";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "./rootSagas";
import reducers from "./rootReducers";

export const history = createHistory();

const reduxRouterMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, reduxRouterMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
