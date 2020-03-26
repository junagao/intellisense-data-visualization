import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { connectedApp as App } from 'containers/App';
import store from 'store';
import GlobalStyle from './index.styles';

render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('app'),
);
