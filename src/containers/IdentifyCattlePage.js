import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
import ons from 'onsenui';
import {
    Page,
    Button,
    Toolbar,
    Icon,
    Input,
    ToolbarButton,
    Row,
    Col,
    Fab

} from 'react-onsenui';

import CattleEditTopBar from '../components/cattle/CattleEditTopBar'

import {
    loadMyHerdPage,
} from'../actions/index'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMyHerdPage: ()  =>  {
      dispatch(loadMyHerdPage())
    }
  }
};


class IdentifyCattlePage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  backFunction = () => {
    this.props.loadMyHerdPage();
  };

  returnCordova() {
    ezar.initializeVideoOverlay(
        function(){ezar.getBackCamera().start()}
    )
    return null;
  }

  returnBrowser() {
    return (
      <div style={styles.page_content}>
        <h2> This will only work when running on a device</h2>

      </div>
    )
  }

  startCamera() {
    if (ons.platform.isWebView()) {
      return this.returnCordova();
    } else {
      return this.returnBrowser();
    }
  }




  render() {
    return (
        <Page modifier="transparent" contentStyle={styles.page_transparent} renderToolbar={() => <CattleEditTopBar title='Identify Cattle' backFunction={this.backFunction} />}>
          {this.startCamera()}
        </Page>
    )
  }


}


const styles = {
  logo_img: {
    'marginTop': '10%',
    'maxWidth': '100%',
    'maxHeight': '100%'
  },
  page_content: {
    textAlign: 'center',
    width: '80%',
    margin: '0 auto 0',
    height: '90%'
  },
  capture: {
    position:'fixed',
    bottom: '0px',
    width:  '200px',
    margin: '0 auto',
    left: '0',
    right: '0',
  },
  overlay: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  cameraText: {
    position: 'fixed',
    top:  '30%',
    margin: '0 auto',
    left: '0',
    right:  '0',
    textAlign: 'center',
  },
  page_transparent: {
    pageTransparent: {
      page__background: {
        backgroundColor: 'transparent'
      }
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattlePage);
