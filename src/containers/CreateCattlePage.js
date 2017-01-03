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

import CattleEditTopBar from '../components/cattle/CattleEditTopBar'

import {
    cattleErrorSeen,
    registerCattle,
    loadCreateCattlePhotoPage
    } from'../actions/index'

const mapStateToProps = (state) => {
  return {
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
    isFetching: state.cattle.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCreateCattlePhotoPage: ()  =>  {
      dispatch(loadCreateCattlePhotoPage())
    },
    register: (props)  =>  {
      dispatch(registerCattle(props.cattle))
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
  static defaultProps = {
    cattle: {
      id: '',
      check_digit: '',
      country_code: '',
      herdmark: '',
      individual_number: '',
    }
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

  backFunction = () => {
    this.props.loadMyHerdPage();
  };

  updateData= ()  =>  {
    this.props.register(this.props);
  }

  updateHerdMark(val) {
    this.props.cattle.herdmark = val;
  }

  updateCountryCode(val)  {
    this.props.cattle.country_code = val;
  }

  updateCheckDigit(val) {
    this.props.cattle.check_digit = val;
  }

  updateIdNumber(val) {
    this.props.cattle.individual_number = val;
  }

  handleCameraClick() {
    this.props.loadCreateCattlePhotoPage()
  }

  render() {
    return (
        <Page
            renderToolbar={() =>
              <CattleEditTopBar title='Create Cattle' navigator={this.props.navigator}
              backFunction={this.backFunction} editFunction={this.updateData} />}>

          <div style={styles.image_container}>
            <div style={{textAlign: 'center',marginTop: '50px'}}>
            <Fab
                onClick={() =>this.handleCameraClick()} >
              <Icon icon='md-camera' />
            </Fab>
              </div>
          </div>
          {this.renderLoadingSpiral()}
          <List modifier="inset">

            <ListItem>
              <Input type="tel" placeholder="Herdmark" minlength="6" maxlength="6" value={this.props.cattle.herdmark}
                     onChange={(event) => this.updateHerdMark(event.target.value)} style={styles.textInput}/>
            </ListItem>
            <ListItem>
              <Input type="text" placeholder="Country Code" value={this.props.cattle.country_code}
                     onChange={(event) => this.updateCountryCode(event.target.value)}
                     style={styles.textInput}/>
            </ListItem>
            <ListItem>
              <Input type="tel" placeholder="Check Digit" min="0" max="7" maxlength="1"
                     onChange={(event) => this.updateCheckDigit(event.target.value)}
                     value={this.props.cattle.check_digit}
                     style={styles.textInput}/>
            </ListItem>
            <ListItem>
              <Input type="tel" placeholder="Individual Number" value={this.props.cattle.individual_number}
                     onChange={(event) => this.updateIdNumber(event.target.value)}
                     style={styles.textInput}/>
            </ListItem>
          </List>
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
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
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
  }

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateCattlePage);
