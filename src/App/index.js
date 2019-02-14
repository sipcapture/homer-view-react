import React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import Router from "../containers/Router";
import store, { history } from "../store";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
