import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import MainSite from "./main_site/main_site";
import SigninFormContainer from "./main_site/session/signin_form_container";
import SignupFormContainer from "./main_site/session/signup_form_container";
import ChatClient from "./chat_client/chat_client";
import GetStartedLandingContainer from "./main_site/content/splash_page/get_started_landing_container";

const App = () => (
  <div>
    <Switch>
      <AuthRoute path='/signup' component={SignupFormContainer} />
      <Route path='/signin' component={SigninFormContainer} />
      <ProtectedRoute path='/client' component={ChatClient} />
      <ProtectedRoute path='/get-started' component={GetStartedLandingContainer} />
      <Route path='/' component={MainSite} />
    </Switch>
  </div>
);

export default App;