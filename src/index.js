import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import api from './middleware/api'
import tasks from './reducers'
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  tasks
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(api, thunk, logger)))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// hot module replace
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    ReactDOM.render(
      <Provider store={store}>
        <React.StrictMode>
          <NextApp />
        </React.StrictMode>
      </Provider>,
      document.getElementById('root')
    );
  })

  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
