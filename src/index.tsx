import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Leaderboard from "layouts/Leaderboard";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/leaderboard" component={Leaderboard} />
      <Redirect exact from="/" to="/leaderboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
