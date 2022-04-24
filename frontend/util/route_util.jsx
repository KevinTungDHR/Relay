import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({ component: Component, path, exact, loggedIn }) => (
  <Route
   path={path}
   exact={exact}
   render={props =>
    !loggedIn ? <Component {...props} /> : <Redirect to='/' />}
  />
);


const Protected = ({ component: Component, path, exact, loggedIn }) => (
  <Route
   path={path}
   exact={exact}
   render={props =>
    loggedIn ? <Component {...props} /> : <Redirect to='/' />}
  />
);

const mapState = (state) => {
  return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(mapState,null)(Auth));
export const ProtectedRoute = withRouter(connect(mapState,null)(Protected));
