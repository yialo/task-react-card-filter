import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './Connected.jsx';

import reducer, { initialState } from '@/store/reducer.js';

export default function WithStore() {
  const store = createStore(
      reducer,
      initialState,
      process.env.NODE_ENV === 'development' ? (
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      ) : null
  );

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
