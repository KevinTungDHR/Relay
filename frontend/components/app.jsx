import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import MainSite from "./main_site/main_site";
import SigninFormContainer from "./main_site/session/signin_form_container";
import SignupFormContainer from "./main_site/session/signup_form_container";
import GetStartedLandingContainer from "./main_site/content/splash_page/get_started_landing_container";
import WorkspaceSetupContainer from "./chat_client/workspace_setup/workspace_setup_container";
import ChatClientContainer from "./chat_client/chat_client_container";

const App = () => (
  <div>
    <Switch>
      <AuthRoute path='/signup' component={SignupFormContainer} />
      <Route path='/signin' component={SigninFormContainer} />
      <ProtectedRoute path='/client/:workspaceId/setup/' component={WorkspaceSetupContainer} />
      <ProtectedRoute path='/client/:workspaceId/:prefix:messageableId?' component={ChatClientContainer} />
      <ProtectedRoute path='/get-started' component={GetStartedLandingContainer} />
      <Route exact path='/' component={MainSite} />
      {/* <Route render={() => <Redirect to="/" />} /> */}
      <Redirect to="/" />

    </Switch>
  </div>
);

export default App;