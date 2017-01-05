import React from 'react';
import {connect} from 'react-redux';
import { notification } from 'onsenui';
import {
    Page,
    Button,
    Toolbar,
    Icon,
    Input,
    ToolbarButton,
    Row,
    Col,
    Fab,
    List,
    ListItem,
    ProgressCircular

} from 'react-onsenui';

import CattleCreateTopBar from '../components/cattle/CattleCreateTopBar';
import CattleEditForm from '../components/cattle/CattleEditForm';

import {
    cattleErrorSeen,
    registerCattle,
    loadCameraCapturePage,
    cancelCreate
    } from'../actions/index'

const mapStateToProps = (state) => {
  return {
    cattle: {
      id: '',
      check_digit: '',
      country_code: '',
      herdmark: '',
      individual_number: '',
    },
    image: state.creation.image,
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
    isFetching: state.cattle.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCancel: ()  =>  {
      dispatch(cancelCreate());
    },
    register: (props)  =>  {
      dispatch(registerCattle(props.cattle,props.image))
    },
    handleErrorSeen:  (params)  =>  {
      dispatch(cattleErrorSeen());
    }
  }
};


class CreateCattlePage extends React.Component {

  static propTypes = {
    cattle: React.PropTypes.shape({
      breed: React.PropTypes.string,
      check_digit: React.PropTypes.number.isRequired,
      country_code: React.PropTypes.string.isRequired,
      dob: React.PropTypes.string,
      gender: React.PropTypes.string,
      herdmark: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
      individual_number: React.PropTypes.number.isRequired,
      name: React.PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    // Check for Errors
    this.handleError(this.props);
  }

  componentWillReceiveProps(props) {
    // Check for Errors
    this.handleError(props);
  }

  handleError(props) {
    return props.isError?
        notification.alert({
          message: 'Error: ' + (props.isError.responseJSON? props.isError.responseJSON.errors[0] : props.isError.responseText),
          callback: props.handleErrorSeen
        })
        :
        null;
  }


  renderLoadingSpiral() {
    return (this.props.isFetching? <ProgressCircular indeterminate />:null);
  }

  deleteCattleHelper= ()  =>  {
    this.props.handleCancel();
  }

  deleteCattle= ()  =>  {
    notification.confirm({
      message: 'Are you sure you want to delete this cattle?',
      callback: this.deleteCattleHelper
    });
  }

  submitData= ()  =>  {
    this.props.register(this.props);
  }

  updateHerdMark = (val) => {
    this.props.cattle.herdmark = val;
  }

  updateCountryCode = (val) =>  {
    this.props.cattle.country_code = val;
  }

  updateCheckDigit = (val) => {
    this.props.cattle.check_digit = val;
  }

  updateIdNumber = (val) => {
    this.props.cattle.individual_number = val;
  }

  render() {
    const funcs = {
      updateHerdMark: this.updateHerdMark,
      updateCountryCode: this.updateCountryCode,
      updateCheckDigit: this.updateCheckDigit,
      updateIdNumber: this.updateIdNumber,
    }
    return (
      <Page
          renderToolbar={() =>
            <CattleCreateTopBar title='Enter Details'
            deleteFunction={this.deleteCattle} submitFunction={this.submitData}/>}>

        <div style={styles.image_container}>
          <img style={styles.reviewImage} src={this.props.image}/>
        </div>
        {this.renderLoadingSpiral()}
        <CattleEditForm cattle={this.props.cattle} updateFuncs={funcs} />
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
