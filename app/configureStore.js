import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import createLogger from 'redux-logger';

import sagaMonitor from './sagaMonitor';
import * as reducers from './reducers';

export default function configureStore() {
  const loggerMiddleware = createLogger({
    level: 'info',
    duration: true,
    collapsed: true
  });
  const sagaMiddleware = createSagaMiddleware({sagaMonitor})
  const store = createStore(
    combineReducers({...reducers}),
    compose(
      applyMiddleware(
        sagaMiddleware,
        loggerMiddleware,
      )
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store;
}
