import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import { Page, Icon, Fab } from 'react-onsenui';

import { cancelIdentify } from '../actions';

const mapStateToProps = (state) => {
  return {
    ...state.identification
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEndIdentification: () => { dispatch(cancelIdentify()) }
  }
};

class IdentifyCattleWaitingPage extends React.Component {

  componentWillMount() {
    this.handlePrompts(this.props);
  }

  componentWillReceiveProps(props) {
    this.handlePrompts(props);
  }

  handlePrompts(props) {
    if (props.error) {
      return notification.alert({
        title: 'Error',
        message: props.error.responseJSON ? props.error.responseJSON.errors[0] : props.error.responseText,
        callback: props.handleEndIdentification
      });
    }
    else if (props.exception) {
      return notification.alert({
        title: props.exception,
        message: ' ',
        callback: props.handleEndIdentification
      });
    }
  }

  render() {
    return (
      <Page>
        <img style={ styles.image } src={ this.props.image }/>
        <div style={styles.scanner}></div>
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
      </Page>
    )
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattleWaitingPage);
