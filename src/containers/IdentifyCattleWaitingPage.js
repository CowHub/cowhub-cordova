import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import {
    Page,
    Icon,
    Fab
} from 'react-onsenui';

import ons from 'onsenui';

import { handleError } from '../utilities/ErrorHandler';
import { cancelIdentify, matchCattleExceptionSeen } from '../actions';

const mapStateToProps = (state) => {
  return {
    image: state.identification.image,
    error: state.cattle.error,
    exception: state.cattle.exception
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEndIdentification: () => {
      dispatch(matchCattleExceptionSeen());
      dispatch(cancelIdentify());
    }
  }
};

class IdentifyCattleWaitingPage extends React.Component {

  static propTypes = {
    image: React.PropTypes.string,
    error: React.PropTypes.object,
    exception: React.PropTypes.string
  };

  componentWillMount() {
    this.handlePrompts(this.props);
  }

  componentWillReceiveProps(props) {
    this.handlePrompts(props);
  }

  handlePrompts(props) {
    if (props.error)
      handleError(props.error);
    else if (props.exception)
      return notification.alert({
        title: props.exception,
        message: ' ',
        callback: props.handleEndIdentification
      });
  }

  renderImage() {
    return (
      <img style={ styles.image } src={ this.props.image }/>
    );
  }

  renderScanner() {
    return (
      <div style={ styles.scanner }></div>
    );
  }

  renderCancelButton() {
    return (
      ons.platform.isIOS() ?
      <Fab
          onClick={ () => notification.confirm({
            message: 'Are you sure you want to cancel request',
            callback: (answer) => { if (answer)
              this.props.handleEndIdentification();
            }
          })}
          position='bottom center'
          style= { styles.fab_ios }>
        <Icon icon='md-close-circle' />
      </Fab>
      :
      <Fab
          onClick={ () => notification.confirm({
            message: 'Are you sure you want to cancel request',
            callback: (answer) => { if (answer)
              this.props.handleEndIdentification();
            }
          })}
          position='bottom center'>
        <Icon icon='md-close-circle' />
      </Fab>
    );
  }

  render() {
    return (
      <Page>
        { this.renderImage() }
        { this.renderScanner() }
        { this.renderCancelButton() }
      </Page>
    );
  }
}

const styles = {
  image: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    margin: '0 auto',
    left: '0',
    right: '0'
  },
  scanner: {
    position: 'fixed',
    animationName: 'slidein',
    animationDuration: '3s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    transform: 'rotate(180deg)',
    background: '-webkit-linear-gradient(top, rgba(0, 180, 39, 0.05) 0%, rgba(0, 210, 39, 0.61) 46%, rgb(0, 233, 60) 50%, rgba(0, 210, 39, 0.61) 54%, rgba(0, 180, 39, 0.05) 100%)',
    height: '3%',
    width: '100%',
    marginTop: '-20px'
  },
  fab_ios: {
    background: 'rgb(66, 139, 202)'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattleWaitingPage);
