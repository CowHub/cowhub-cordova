import React from 'react';
import { connect } from 'react-redux';
import ons from 'onsenui';
import {
    Navigator
} from 'react-onsenui';

import LoginPage from './containers/LoginPage';
import MyHerdPage from './containers/MyHerdPage';
import CreateCattlePage from './containers/CreateCattlePage';
import CreateCattlePhotoPage from './containers/CreateCattlePhotoPage';
import EditCattlePage from './containers/EditCattlePage';
import IdentifyCattlePage from './containers/IdentifyCattlePage';
import VerifyImagePage from './containers/VerifyImagePage';

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
    handleActivateCamera: ()  =>  {
      dispatch(activateCamera())
    }
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
        case'CREATE_CATTLE_PHOTO_PAGE':
          this.refs.navigator.resetPage(pages.CreateCattlePhotoPage);
          props.handlePageRendered('CREATE_CATTLE_PHOTO_PAGE');
          return;
        case'EDIT_CATTLE_PAGE':
          this.refs.navigator.pushPage(pages.EditCattlePage);
          props.handlePageRendered('EDIT_CATTLE_PAGE');
          return;
        case'IDENTIFY_CATTLE_PAGE':
          if (ons.platform.isWebView()) {
            props.handleActivateCamera();
          }
          this.refs.navigator.resetPage(pages.IdentifyCattlePage);
          props.handlePageRendered('IDENTIFY_CATTLE_PAGE');
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
  CreateCattlePhotoPage: {
    component: CreateCattlePhotoPage,
    props: {
      key: 'CREATE_CATTLE_PHOTO_PAGE'
    }
  },
  EditCattlePage: {
    component: EditCattlePage,
    props: {
      key: 'EDIT_CATTLE_PAGE'
    }
  },
  IdentifyCattlePage: {
    component: IdentifyCattlePage,
    props: {
      key: 'IDENTIFY_CATTLE_PAGE'
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

