import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './util/session_api_util'
document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById('root');

  window.user = { email: "TestUser1", display_name: "testuser", password: "password"}
  window.login = login
  window.signup = signup
  window.logout = logout
  ReactDOM.render(<h1>Relay Clone</h1>, root);
});