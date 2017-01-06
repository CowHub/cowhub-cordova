import React from 'react';
import { connect } from 'react-redux';

import {
    Icon,
    Fab

} from 'react-onsenui';

import {
    takePhoto,
    backFromCamera
} from'../actions/index'

const mapStateToProps = (state) => {
  return {
      ...state.camera
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    handleTakePhoto: ()  =>  {
      dispatch(takePhoto())
    },
    handleBack: ()  =>  {
      dispatch(backFromCamera());
    }
  }
};

class Camera extends React.Component {


  handleCameraClick() {
    this.props.handleTakePhoto();
  }

  handleCloseClick()  {
    this.props.handleBack();
  }

  render() {

    return (
        <div style={styles.overlay}>
          <div style={styles.cameraText}>
            <h2>Please line up animal with guide</h2>
          </div>
          <img style={styles.muzzle} src="/img/outline.png"/>
          <Fab
              onClick={() => this.handleCloseClick()}
              position='bottom left'>
            <Icon icon='md-close-circle' />
          </Fab>
          <Fab
              onClick={() =>this.handleCameraClick()}
              position='bottom right'>
            <Icon icon='md-camera' />
          </Fab>
        </div>
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
  muzzle: {
    width: "100%",
    marginTop: "20%"
  },
  cameraText: {
    top:  '30%',
    margin: '0 auto',
    left: '0',
    right:  '0',
    textAlign: 'center',
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);