import React, { Component } from 'react';
import { render } from 'react-dom';

import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import App from './components/App';
import loadOrderBooksEpic from './components/App/epic';
import quoteEpic from './components/OrderForm/epic';
import appReducer from './components/App/reducer';
import orderFormReducer from './components/OrderForm/reducer';

import './styles/manifest.styl';

const epicMiddleware = createEpicMiddleware(combineEpics(
  loadOrderBooksEpic,
  quoteEpic
));

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainStore = createStore(
  combineReducers({
    app: appReducer,
    orderForm: orderFormReducer,
    routing: routerReducer,
  }),
  composeEnhancers(applyMiddleware(epicMiddleware, routeMiddleware))
);

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" render={() => <App />} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

render(
  <Root store={mainStore} />,
  document.getElementById('app')
);
