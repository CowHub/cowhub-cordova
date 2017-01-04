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
    backFromCamera
} from'../actions/index'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleBack: ()  =>  {
      dispatch(backFromCamera());
    }
  }
};

// This is a wrapper for the Camera component - since if we are running in a browser the cordova module ezAR will
// not load.

class CameraCapturePage extends React.Component {

  backFunction = () =>  {
    this.props.handleBack();
  };

  returnCordova() {
    return (
        <Camera onCaptureFunction={this.onCapture}/>
    );
  }

  returnBrowser() {
    return (
      <div>
        <h2> This will only work when running on a device</h2>

      </div>
    )
  }

  startCamera() {
    if (ons.platform.isWebView()) {
      return this.returnCordova();
    } else {
      //return this.returnBrowser();
      // DEBUG!
      return this.returnCordova();
    }
  }


  render() {
    // renderToolbar={() => <CattleEditTopBar title='Capture Image' backFunction={this.backFunction} />}
    return (
        <Page modifier="transparent">
          {this.startCamera()}
        </Page>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(CameraCapturePage);
