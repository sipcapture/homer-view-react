import * as React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "config/routes";
import Home from "../../pages/Home";
import Tabs from "../../pages/Tabs";
import "./styles.scss";

const bc = "app";

const Router = () => (
  <div className={bc}>
    <Switch>
      <Route exact path={routes.root} component={Tabs} />
      <Route path={routes.dashboard} component={Home} />
    </Switch>
  </div>
);

Router.displayName = "Router";

export default Router;
