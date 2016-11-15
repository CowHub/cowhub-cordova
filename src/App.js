import React from 'react';

import {
    Navigator
} from 'react-onsenui';

import LoginPage from './containers/LoginPage';


class App extends React.Component{

  renderPage(route,navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    return <route.comp key={route.key} navigator = {navigator}/>
  }

  render()  {
    return <Navigator initialRoute={{comp:LoginPage,key:'LOGIN_PAGE',hasBackButton:false,title:'login'}} renderPage={this.renderPage}/>
  }
}

export default App

// const renderPage = (route, navigator) => (
//     <route.component key={route.key} navigator={navigator} />
// );
//
// const App = () => (
//     <Navigator
//         renderPage={renderPage}
//         initialRoute={{
//           component: LoginPage,
//           key: 'LOGIN_PAGE',
//           title: 'Login',
//           hasBackButton: false
//         }}
//     />
// );
