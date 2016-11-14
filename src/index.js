import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';
import App from './App';


import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
const logger = createLogger();

import store from './store/store'


const rootElement = document.getElementById('root');

ons.ready(() => render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    rootElement
));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
        <AppContainer>
          <Provider store={store}>
            <NextApp />
          </Provider>
        </AppContainer>,
        rootElement
    );
  });
}
