import React from "react"
import ReactDOM from "react-dom"
import {Route, Switch, Redirect, HashRouter} from "react-router-dom"

// core components
import Leaderboard from "@layouts/Leaderboard"

import "@assets/css/material-dashboard-react.css?v=1.8.0"

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/leaderboard/:league" component={Leaderboard} />
      <Redirect exact={true} from="/" to="/leaderboard/alpha" />
      <Redirect exact={true} from="/leaderboard" to="/leaderboard/alpha" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
)
