import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import { Page, Button, ProgressCircular } from 'react-onsenui';

import CustomPropTypes from '../utilities/CustomPropTypes';
import { handleError } from '../utilities/ErrorHandler';

import CattleDetail from '../components/cattle/CattleDetail';
import CattleCreateTopBar from '../components/topbar/CattleCreateTopBar';

import { cancelCreate, loadCameraCapturePage, registerCattle } from '../actions'

const mapStateToProps = (state) => {
  return {
    cattle: state.creation.cattle,
    image: state.creation.image,
    error: state.cattle.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCancel: () => dispatch(cancelCreate()),
    handleRegister: (props) => dispatch(registerCattle(props.cattle, props.image)),
  }
};

class CreateCattlePage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string,
    error: React.PropTypes.object
  };

  componentWillMount() {
    handleError(this.props.error);
  }

  componentWillReceiveProps(props) {
    handleError(props.error);
  }

  renderToolbar() {
    return (
      <CattleCreateTopBar
        handleCancel={ () => notification.confirm({
          message: 'Are you sure you want to cancel the creation of this cattle?',
          callback: this.props.handleCancel
        })}
      />
    );
  }

  renderCattleImage() {
    return (
      <div style={styles.image_container}>
        <img style={styles.reviewImage} src={this.props.image}/>
      </div>
    );
  }

  renderCattleDetail() {
    return (
      <CattleDetail
        cattle={ this.props.cattle }
        handleChange={ (key, val) => {
          this.props.cattle[key] = val;
          this.forceUpdate();
        }}
      />
    );
  }

  renderDoneButton() {
    let c = this.props.cattle;
    let complete = c.country_code && c.herdmark && c.check_digit && c.individual_number;
    return (
      <Button style={ complete ? styles.doneButton : styles.doneButtonDisabled }
        onClick={ () => this.props.handleRegister(this.props) }
      >
        Done
      </Button>
    );
  }

  render() {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        { this.renderCattleImage() }
        { this.renderCattleDetail() }
        { this.renderDoneButton() }
      </Page>
    )
  }
}

const styles = {
  doneButton: {
    position: 'fixed',
    bottom: '0',
    height: '3vh',
    width: '100%'
  },
  doneButtonDisabled: {
    background: 'rgb(128, 128, 128)',
    position: 'fixed',
    bottom: '0',
    height: '3vh',
    width: '100%'
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCattlePage);
