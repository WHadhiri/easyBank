import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "../styles.css";

import ATMroutes from "../ATMroutes.js";

export default function AppClient() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/atm") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="justify-content-center">
      <Switch>
        {getRoutes(ATMroutes)}
        <Redirect from="*" to="/atm/ATM" />
      </Switch>
    </div>
  );
}
