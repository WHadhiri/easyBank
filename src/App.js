import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AppClient from "./ATM/Components/AppClient.js";
import { AuthContext } from "components/Context/auth-context.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClientIn, setIsClientIn] = useState(false);
  const [atm, setAtm] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const accessATM = useCallback((atm) => {
    setAtm(atm);
    console.log("here");
    setIsClientIn(true);
  }, []);

  let routes;

  if (isLoggedIn && !isClientIn)
    routes = (
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/admin" />
      </Switch>
    );
  else if (!isLoggedIn && isClientIn)
    routes = (
      <Switch>
        <Route path="/atm" render={(props) => <AppClient {...props} />} />
        <Redirect to="/atm" />
      </Switch>
    );
  else
    routes = (
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect to="/auth" />
      </Switch>
    );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isClientIn: isClientIn,
        accessATM: accessATM,
        atm: atm,
      }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
