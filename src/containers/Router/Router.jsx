import * as React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "config/routes";
import Tabs from "../../pages/Tabs";
import "./styles.scss";

const bc = "app";

const Router = () => (
  <div className={bc}>
    <Switch>
      <Route exact path={routes.root} component={Tabs} />
    </Switch>
  </div>
);

Router.displayName = "Router";

export default Router;
