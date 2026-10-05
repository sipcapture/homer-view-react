import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "../containers/Router";
import store from "../store";

// react-router-redux is unmaintained (and its replacement
// connected-react-router peers React <= 17), so the router now owns history
// directly via BrowserRouter. Hot reloading is handled by react-refresh at
// the webpack level, so the hot(module) wrapper is gone.
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);

export default App;