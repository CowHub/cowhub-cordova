import React from 'react';
import {connect} from 'react-redux';
import {
    Page,
    Icon,
    Fab
} from 'react-onsenui';

import {
    backFromVerify,
    imageConfirmed
} from '../actions';

const mapStateToProps = (state) => {
  return {
    image: state.camera.image,
    crop: state.camera.crop
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleBack: () => dispatch(backFromVerify()),
    handleVerified: (img) => dispatch(imageConfirmed(img))
  };
};

class VerifyImagePage extends React.Component {

  static propTypes = {
    image: React.PropTypes.string,
  };

  renderImage() {
    return (
      <img style={ styles.image } src={ this.props.image }/>
    );
  }

  renderTitle() {
    return (
      this.props.crop ?
        <h2 style={ styles.title }>
          Please ensure that the muzzle lines up with the template
        </h2>:
        <h2 style={ styles.title }>
          Confirm ID photo
        </h2>
    );
  }

  renderOverlay() {
    return (
      this.props.crop ?
        <img style={ styles.overlay } src='img/outline.png'/>:
        null
    );
  }

  renderBackButton() {
    return (
      <Fab
          onClick={ () => this.props.handleBack() }
          position='bottom left'>
        <Icon icon='md-arrow-left' />
      </Fab>
    );
  }

  renderValidateButton() {
    return (
      <Fab
          onClick={ () => this.props.handleVerified(this.props.image) }
          position='bottom right'>
        <Icon icon='md-check' />
      </Fab>
    );
  }

  render() {
    return (
      <Page>
        { this.renderImage() }
        { this.renderTitle() }
        { this.renderOverlay() }
        { this.renderBackButton() }
        { this.renderValidateButton() }
      </Page>
    );
  }
}

const styles = {
  title: {
    textAlign: 'center',
    position: 'absolute'
  },
  image: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    margin: '0 auto',
    top: '0',
    left: '0',
    right: '0'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    top: '30%',
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyImagePage);
