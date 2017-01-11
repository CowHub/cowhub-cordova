import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import {
    Page,
    Button
} from 'react-onsenui';

import CustomPropTypes from '../utilities/CustomPropTypes';
import { handleError } from '../utilities/ErrorHandler';

import CattleDetail from '../components/cattle/CattleDetail';
import CattleCreateTopBar from '../components/topbar/CattleCreateTopBar';
import ProgressSpinner from '../components/loader/ProgressSpinner';

import { cancelCreate, loadCameraCapturePage, registerCattle } from '../actions'

const mapStateToProps = (state) => {
  return {
    cattle: state.creation.cattle,
    image: state.creation.image,
    croppedImage: state.creation.croppedImage,
    isUploading: state.cattle.fetching,
    error: state.cattle.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCancel: () => dispatch(cancelCreate()),
    handleRegister: (props) => {
      let params = {
        cattle: props.cattle,
        imprint_image: props.croppedImage,
        profile_image: props.image
      }
      dispatch(registerCattle(params));
    },
  }
};

class CreateCattlePage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string,
    croppedImage: React.PropTypes.string,
    isUploading: React.PropTypes.bool,
    error: React.PropTypes.object
  };

  componentWillMount() {
    handleError(this.props.error);
  }

  componentWillReceiveProps(props) {
    handleError(props.error);
  }

  gotLocation(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.props.cattle.longitude = longitude;
    this.props.cattle.latitude = latitude;
  }

  renderToolbar() {
    return (
      <CattleCreateTopBar
        handleCancel={ () => notification.confirm({
          message: 'Are you sure you want to cancel the creation of this cattle?',
          callback: (res) => { if (res)
              this.props.handleCancel(); }
        })}
      />
    );
  }

  renderLoadingSpiral() {
    return (
      <ProgressSpinner
        message='Registering Cattle'
        shouldDisplay={ this.props.isUploading }
      />
    );
  }

  renderCattleDetail() {
    return (
      <CattleDetail
        cattle={ this.props.cattle }
        image={ this.props.image }
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
        { this.renderCattleDetail() }
        { this.renderDoneButton() }
        { this.renderLoadingSpiral() }
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCattlePage);
