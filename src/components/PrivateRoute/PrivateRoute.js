import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        authed === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
