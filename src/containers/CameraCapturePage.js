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

const mapStateToProps = (state) => {
  return {
    crop: state.camera.crop,
    active: state.camera.active
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
    return (
      this.props.crop && this.props.active?
      <h2 style={ styles.title }>
        Line Up Cattle with Mask
      </h2> :
        <h2 style={ styles.title }>
          Please take ID photo of cattle
        </h2>
    );
  }

  renderMuzzle() {
    return (
      this.props.crop && this.props.active?
      <img style={ styles.muzzle } src='img/outline.png'/>:
        null
    );
  }

  renderCloseButton() {
    return (
      <Fab
          onClick={ () => this.props.handleBack() }
          position='bottom left'>
        <Icon icon='md-close-circle' />
      </Fab>
    );
  }

  renderCameraButton() {
    return (
      <Fab
          onClick={ () => this.props.handleTakePhoto() }
          position='bottom right'>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraCapturePage);
