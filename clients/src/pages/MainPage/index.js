import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailJob from "../DetailsJob";
import HomePage from "../HomePage";

export default function MainPage() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/jobs/:id">
          <DetailJob />
        </Route>
      </Switch>
    </Router>
  );
}
