import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InitialPage from 'containers/InitialPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default () => (
  <Switch>
    <Route exact path="/" component={InitialPage} />
    <Route path="" component={NotFoundPage} />
  </Switch>
);
