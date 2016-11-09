import React, { Component } from 'react';
import { AppContainer } from 'react-hot-loader';

import {
  Navigator
} from 'react-onsenui';

import store from './store';

import MainPage from './components/MainPage';

const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
);

class App extends Component {

  render() {
    <AppContainer>
      <Provider store={ store }>
        <Navigator
          renderPage={ renderPage }
          initialRoute={{
            component: MainPage,
            key: 'MAIN_PAGE'
          }}
        />
      </Provider>
    </AppContainer>;
  }

}

export default App;
