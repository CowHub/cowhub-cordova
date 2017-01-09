import React from 'react';
import {connect} from 'react-redux';
import {
    Page,
    Icon,
    Fab
} from 'react-onsenui';

import ons from 'onsenui';

import { takePhoto, backFromCamera } from '../actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTakePhoto: () => dispatch(takePhoto()),
    handleBack: () => dispatch(backFromCamera())
  };
};

class CameraCapturePage extends React.Component {

  renderTitle() {
    return (
      <h2 style={ styles.title }>
        Line Up Cattle with Mask
      </h2>
    );
  }

  renderMuzzle() {
    return (
      <img style={ styles.muzzle } src='img/outline.png'/>
    );
  }

  renderCloseButton() {
    return (
      <Fab
          onClick={ () => this.props.handleBack() }
          position='bottom left' style={ons.platform.isIOS() && styles.fab_ios}
      >
        <Icon icon='md-close-circle' />
      </Fab>
    );
  }

  renderCameraButton() {
    return (
      <Fab
          onClick={ () => this.props.handleTakePhoto() }
          position='bottom right' style={ons.platform.isIOS() && styles.fab_ios}
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
    height: '100%',
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
