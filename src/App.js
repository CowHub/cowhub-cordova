import React from 'react';
import { connect } from 'react-redux';
import {
    Navigator
} from 'react-onsenui';

import LoginPage from './containers/LoginPage';
import MyHerdPage from './containers/MyHerdPage';
import CreateCattlePage from './containers/CreateCattlePage';
import EditCattlePage from './containers/EditCattlePage';
import VerifyImagePage from './containers/VerifyImagePage';
import CameraCapturePage from './containers/CameraCapturePage';

import {
    announcePageRendered,
    activateCamera
} from './actions/index'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePageRendered: (pageName) => {
      dispatch(announcePageRendered(pageName));
    },
  };
};

class App extends React.Component{

  constructor() {
    super();
  }



  componentWillMount() {
  }

  componentWillReceiveProps(props) {
    this.selectPage(props)
  }


  selectPage(props)  {
    // Get Page to be loaded
    const currPage = props.navigation.requestedPage;
    if (currPage != props.navigation.renderedPage) {
      switch (currPage) {
        case'LOGIN_PAGE':
          this.refs.navigator.resetPage(pages.LoginPage);
          props.handlePageRendered('LOGIN_PAGE');
          return;
        case'MY_HERD_PAGE':
          props.navigation.back ?
              this.refs.navigator.popPage() :
              this.refs.navigator.resetPage(pages.MyHerdPage);
          props.handlePageRendered('MY_HERD_PAGE');
          return;
        case'CREATE_CATTLE_PAGE':
          this.refs.navigator.pushPage(pages.CreateCattlePage);
          props.handlePageRendered('CREATE_CATTLE_PAGE');
          return;
        case'EDIT_CATTLE_PAGE':
          this.refs.navigator.pushPage(pages.EditCattlePage);
          props.handlePageRendered('EDIT_CATTLE_PAGE');
          return;
        case'CAMERA_CAPTURE_PAGE':
          props.navigation.back ?
              this.refs.navigator.popPage() :
          this.refs.navigator.resetPage(pages.CameraCapturePage);
          props.handlePageRendered('CAMERA_CAPTURE_PAGE');
          return;
        case'VERIFY_IMAGE_PAGE':
          this.refs.navigator.pushPage(pages.VerifyImagePage);
          props.handlePageRendered('VERIFY_IMAGE_PAGE');
          return;
        default:
          return;
      }
    }
  }


  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;
    return React.createElement(route.component, props);
  }

  render() {
    this.navigator = React.createElement(
        Navigator,
        {
          initialRoute: {component: LoginPage, props: {key: 'LOGIN_PAGE'}},
          renderPage: this.renderPage,
          ref: 'navigator'
        },
        null
    );
    return this.navigator
  }
}

const pages = {
  LoginPage: {
    component: LoginPage,
    props: {
      key: 'LOGIN_PAGE'
    }
  },
  MyHerdPage: {
    component: MyHerdPage,
    props: {
      key: 'MY_HERD_PAGE'
    }
  },
  CreateCattlePage: {
    component: CreateCattlePage,
    props: {
      key: 'CREATE_CATTLE_PAGE'
    }
  },
  CameraCapturePage: {
    component: CameraCapturePage,
    props: {
      key: 'CAMERA_CAPTURE_PAGE'
    }
  },
  EditCattlePage: {
    component: EditCattlePage,
    props: {
      key: 'EDIT_CATTLE_PAGE'
    }
  },
  VerifyImagePage: {
    component: VerifyImagePage,
    props: {
      key: 'VERIFY_IMAGE_PAGE'
    }
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

