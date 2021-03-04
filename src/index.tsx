import {createBrowserHistory} from "history"
import React from "react"
import ReactDOM from "react-dom"
import {Route, Switch, Redirect,Router} from "react-router-dom"

// core components
import Leaderboard from "@layouts/Leaderboard"

import "@assets/css/material-dashboard-react.css?v=1.8.0"

let history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/leaderboard" component={Leaderboard} />
      <Redirect exact={true} from="/" to="/leaderboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
)
