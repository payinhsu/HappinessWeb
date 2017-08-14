import 'assets/css/app.css';
import 'react-big-calendar/less/styles.less';
import 'examples/styles.less';
import 'examples/prism.less';
import React                from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import { browserHistory } from 'react-router'
import { Provider }         from 'react-redux';
import routes               from 'routes';
import configureStore from 'store';
//import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

const initialState = window.__INITIAL_STATE__;
// const history = createBrowserHistory();
const store = configureStore();

render(
  <Provider store={store}>
    <Router children={routes(store)} history={browserHistory} />
  </Provider>,
  document.getElementById('react-view')
);