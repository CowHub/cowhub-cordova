import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import { Page, Button, Toolbar, ToolbarButton, ProgressCircular } from 'react-onsenui';

import CattleDetail from '../components/cattle/CattleDetail';
import CustomPropTypes from '../utilities/CustomPropTypes'

import { cancelCreate, cattleErrorSeen, loadCameraCapturePage, registerCattle } from'../actions/index'

const mapStateToProps = (state) => {
  return {
    cattle: state.creation.cattle,
    image: state.creation.image,
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
    isFetching: state.cattle.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCancel: () => { dispatch(cancelCreate()) },
    handleRegister: (props) => { dispatch(registerCattle(props.cattle,props.image)) },
    handleErrorSeen: (params) => { dispatch(cattleErrorSeen()) }
  }
};

class CreateCattlePage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string,
    isEditing: React.PropTypes.bool,
    isError: React.PropTypes.bool,
    isFetching: React.PropTypes.bool
  };

  componentWillMount() {
    this.handleError(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleError(props);
  }

  handleError(props) {
    return props.isError
      ? notification.alert({
        title: 'Error',
        message: props.isError.responseJSON ? props.isError.responseJSON.errors[0] : props.isError.responseText,
        callback: props.handleErrorSeen
      })
      : null;
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <ToolbarButton onClick={() =>
            notification.confirm({
              message: 'Are you sure you want to cancel the creation of this cattle?',
              callback: this.props.handleCancel
            })
          }>
            Cancel
          </ToolbarButton>
        </div>
        <div className='center'>Enter Cattle Details</div>
      </Toolbar>
    );
  }

  renderLoadingSpiral() {
    if (this.props.isFetching)
      return <ProgressCircular indeterminate />;
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
        { this.renderLoadingSpiral() }
        { this.renderCattleImage() }
        { this.renderCattleDetail() }
        { this.renderDoneButton() }
      </Page>
    )
  }
}

const styles = {
  logo_img: {
    'marginTop': '10%',
    'maxWidth': '100%',
    'maxHeight': '100%'
  },
  page_content: {
    textAlign: 'center',
    width: '80%',
    margin: '0 auto 0',
    height: '90%',
    marginTop: '25%',
  },
  card_wrapper: {
    lineHeight: 1,
    height: '62px',
    paddding: '10px'
  },
  image_container: {
    backgroundColor: 'white',
    color: 'black',
    height: '250px'
  },
  textInput: {
    marginTop: '4px',
    width: '100%'
  },
  formInput: {
    fontWeight: '500',
    fontSize: '17px',
    marginBottom: '4px'
  },
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
  reviewImage: {
    position: 'fixed',
    width: '100%',
    margin: '0 auto',
    left: '0',
    right: '0',
    maxHeight: '250px'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCattlePage);
