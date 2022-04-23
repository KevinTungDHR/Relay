import React from "react";
import { Switch, Route } from "react-router-dom";
import MainSite from "./main_site/main_site";
import SignupForm from "./main_site/session/signup_form";
import SigninForm from "./main_site/session/signin_form";
import ChatClient from "./chat_client/chat_client";

const App = () => (
  <div>
    <Switch>
      <Route path='/signup' component={SignupForm} />
      <Route path='/signin' component={SigninForm} />
      <Route path='/client' component={ChatClient} />
      <Route path='/' component={MainSite} />
    </Switch>
  </div>
);

export default App;