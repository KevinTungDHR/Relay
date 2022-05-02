import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { fetchSearchQuery } from './actions/search_actions';

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
  }

  // Test Start
  window.dispatch = store.dispatch
  window.getState = store.getState

  window.fetchSearchQuery = fetchSearchQuery
  // Test End

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});