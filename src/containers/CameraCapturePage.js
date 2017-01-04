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
import Camera from '../components/Camera'

import {
    loadMyHerdPage,
    loadVerifyImagePage,
    deactivateCamera,
    
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
    },
    loadVerifyImagePage:  ()  =>  {
      dispatch(loadVerifyImagePage())
    },
    handleDeactivateCamera: ()  =>  {
      dispatch(deactivateCamera())
    }
  }
};


class CameraCapturePage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  backFunction = () =>  {
    if (ons.platform.isWebView()) {
      this.props.handleDeactivateCamera();
    }
    this.props.loadMyHerdPage();
  };
  
  onCapture = () => {
    this.props.loadVerifyImagePage();
    this.props.handleDeactivateCamera();
  };
  

  returnCordova() {
    
    return (
        <Camera onCaptureFunction={this.onCapture}/>
    );
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
        <Page modifier="transparent"
              renderToolbar={() => <CattleEditTopBar title='Identify Cattle' backFunction={this.backFunction} />}>
          {this.startCamera()}
        </Page>
    )
  }


}


const styles = {
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
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CameraCapturePage);
