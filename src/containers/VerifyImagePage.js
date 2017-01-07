import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
import { Page, Icon, Fab } from 'react-onsenui';

import { backFromVerify, imageConfirmed } from '../actions';

const mapStateToProps = (state) => {
  return {
    image: state.camera.image
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
      <h2 style={ styles.title }>
        Validate Image
      </h2>
    );
  }

  renderOverloay() {
    return (
      <img style={ styles.overlay } src='img/outline.png'/>
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
        { this.renderTitle() }
        { this.renderImage() }
        { this.renderOverloay() }
        { this.renderBackButton() }
        { this.renderValidateButton() }
      </Page>
    );
  }
}

const styles = {
  title: {
    textAlign: 'center'
  },
  image: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    margin: '0 auto',
    left: '0',
    right: '0'
  },
  overlay: {
    position: 'fixed',
    width: "100%",
    marginTop: "20%"
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyImagePage);
