import * as React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "config/routes";
import Tabs from "../../pages/Tabs";
import "./styles.scss";

const bc = "app";

// react-router v6 renamed Switch -> Routes and replaced component={X}
// with element={<X />}.
const Router = () => (
  <div className={bc}>
    <Routes>
      <Route path={routes.root} element={<Tabs />} />
    </Routes>
  </div>
);

Router.displayName = "Router";

export default Router;