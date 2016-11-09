import React from 'react';
import { render } from 'react-dom';

import App from './src/App';
import './src/index.scss';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import './stylus/index.styl';

const rootElement = document.getElementById('root');

ons.ready(() => render(
  <App />,
  rootElement
));

if (module.hot) {
  module.hot.accept('./src/App', () => {
    const NextApp = require('./src/App').default;
    render(
      <NextApp />,
      rootElement
    );
  });
}
