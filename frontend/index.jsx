import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signup, login, logout } from './actions/session_actions'
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById('root');

  window.user = { email: "TestUser5", display_name: "testuser", password: "password"}
  window.login = login
  window.signup = signup
  window.logout = logout

  const store = configureStore()
  window.dispatch = store.dispatch
  window.getState = store.getState
  ReactDOM.render(<Root store={store}/>, root);
});