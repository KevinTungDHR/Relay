import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signup, login, logout } from './actions/session_actions'
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState)
    delete window.currentUser;
  } else {
    store = configureStore();
  };

  // Test Start
  window.dispatch = store.dispatch
  window.getState = store.getState
  // Test End

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});