import React from 'react';

import {
    Navigator
} from 'react-onsenui';

import LoginPage from './components/user/LoginPage';

const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
);

const App = () => (
    <Navigator
        renderPage={renderPage}
        initialRoute={{
          component: LoginPage,
          key: 'LOGIN_PAGE',
          title: 'Login',
          hasBackButton: false
        }}
    />
);

export default App