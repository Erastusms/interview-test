import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, RegisterPage, MainPage } from "pages";
import { Header } from "components";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);

  const userLogin = (param) => {
    setLogin(param);
  };

  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  console.log(login);

  return (
    <Router>
      {login ? (
        <>
          <Header userLogin={userLogin} />
          <MainPage />
        </>
      ) : (
        <Switch>
          <Route exact path="/">
            <LoginPage
              login={login}
              userLogin={userLogin}
              getToken={getToken}
            />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default App;
