import React from 'react';
import { connect } from 'react-redux';

import {
    Icon,
    Fab

} from 'react-onsenui';

import {
    takePhoto
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
    }
  }
};

class Camera extends React.Component {

  static propTypes = {
    onCaptureFunction: React.PropTypes.func.isRequired
  };

  handleClick() {
    this.props.handleTakePhoto();
    this.props.onCaptureFunction();
  }

  render() {

    return (
        <div>
          <img style={styles.overlay} src="img/outline.png"/>
          <div style={styles.cameraText}>
            <h2>Please line up animal with guide</h2>
          </div>
          <Fab
              onClick={() =>this.handleClick()}
              position='bottom center'>
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
  cameraText: {
    position: 'fixed',
    top:  '30%',
    margin: '0 auto',
    left: '0',
    right:  '0',
    textAlign: 'center',
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);