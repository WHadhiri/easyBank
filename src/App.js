import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AppClient from "./ATM/Components/AppClient.js";
import { AuthContext } from "components/Context/auth-context.js";

const App = () => {
  const [token, setToken] = useState(false);
  const [isClientIn, setIsClientIn] = useState(false);
  const [atm, setAtm] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  const accessATM = useCallback((atm) => {
    setAtm(atm);
    setIsClientIn(true);
  }, []);

  const exitATM = useCallback((atm) => {
    setAtm(null);
    setIsClientIn(false);
  }, []);

  let routes;

  if (token && !isClientIn)
    routes = (
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/admin" />
      </Switch>
    );
  else if (!token && isClientIn)
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
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
        isClientIn: isClientIn,
        accessATM: accessATM,
        atm: atm,
        exitATM: exitATM,
      }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
