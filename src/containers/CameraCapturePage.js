import React from 'react';
import {connect} from 'react-redux';
import {
  Page,
  Icon,
  Fab
} from 'react-onsenui';

import {
  takePhoto,
  backFromCamera
} from '../actions';

import ons from 'onsenui';

const mapStateToProps = (state) => {
  return {
    crop: state.camera.crop,
    active: state.camera.active,
    message: state.camera.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTakePhoto: () => dispatch(takePhoto()),
    handleBack: () => dispatch(backFromCamera())
  };
};

class CameraCapturePage extends React.Component {

  renderTitle() {
    if (this.props.crop && this.props.message) {
      return (
        <h2 style={ styles.title }>
          Line Up Cattle with Mask
        </h2>
      );
    } else if (this.props.message) {
      return (
        <h2 style={ styles.title }>
          Please take ID photo of cattle
        </h2>
      );
    } else return null
  }

  renderMuzzle() {
    return (
      this.props.crop && this.props.message ?
        <img style={ styles.muzzle } src='img/outline.png'/> :
        null
    );
  }

  renderCloseButton() {
    return (
      ons.platform.isIOS() ?
      <Fab
          onClick={ () => this.props.handleBack() }
          position='bottom left' style={styles.fab_ios}
      >
        <Icon icon='md-close-circle' />
      </Fab> :
        <Fab
          onClick={ () => this.props.handleBack() }
          position='bottom left'
        >
          <Icon icon='md-close-circle' />
        </Fab>
    );
  }

  renderCameraButton() {
    return (
      ons.platform.isIOS() ?
      <Fab
          onClick={ () => this.props.handleTakePhoto() }
          position='bottom right' style={styles.fab_ios}
      >
        <Icon icon='md-camera' />
      </Fab> :
        <Fab
          onClick={ () => this.props.handleTakePhoto() }
          position='bottom right'
        >
          <Icon icon='md-camera' />
        </Fab>
    );
  }

  render() {
    return (
      <Page modifier='transparent'>
        <div style={ styles.overlay }>
          { this.renderTitle() }
          { this.renderMuzzle() }
          { this.renderCloseButton() }
          { this.renderCameraButton() }
        </div>
      </Page>
    );
  }
}

const styles = {
  overlay: {
    width: '100%',
    objectFit: 'contain',
  },
  muzzle: {
    position: 'absolute',
    width: '100%',
    top: '30%'
  },
  title: {
    textAlign: 'center'
  },
  fab_ios: {
    background: 'rgb(66, 139, 202)'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraCapturePage);
