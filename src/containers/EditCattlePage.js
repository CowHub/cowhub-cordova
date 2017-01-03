import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
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

import CattleEditTopBar from '../components/cattle/CattleEditTopBar';
import {
    endEditCattle,
    updateCattle,
    deleteCattle,
    backToMyHerdPage,
    cattleErrorSeen
    } from'../actions/index'
const mapStateToProps = (state) => {
  return {
    ...state.cattle.cattle[state.cattle.cattlePos],
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
    isFetching: state.cattle.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEndEdit: (pos) => {
      dispatch(endEditCattle(pos));
    },
    handleCattleUpdate: (props) => {
      dispatch(updateCattle(props.cattle.id, props.cattle));
    },
    handleCattleDelete: (id) => {
      dispatch(deleteCattle(id))
    },
    handleErrorSeen:  (params)  =>  {
      dispatch(cattleErrorSeen());
    }
  }
};


class EditCattlePage extends React.Component {

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
      images: React.PropTypes.arrayOf(React.PropTypes.string),
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
    this.setBackground(this.props);

    // Check for Errors
    this.handleError(this.props);
  }

  componentWillReceiveProps(props) {
    // Check for Errors
    this.handleError(props);
    this.setBackground(props)
  }

  getImage()  {
    if (this.props.cattle.images) {
      if (this.props.cattle.images[0]){
        return this.props.cattle.images[0];
      }
    }
    return null;
  }

  setBackground(props) {
    styles.image_container.backgroundImage = 'url('+this.getImage()+')'
  }



  handleError(props) {
    return props.isError?
        notification.alert({
          message: 'Error: ' + props.isError,
          callback: props.handleErrorSeen
        })
        :
        null;
  }

  renderLoadingSpiral() {
    return (this.props.isFetching? <ProgressCircular indeterminate />:null);
  }

  endEditing= ()  =>  {
    this.props.handleEndEdit();

  }

  updateData= ()  =>  {
    this.props.handleCattleUpdate(this.props);
  }

  deleteCattleHelper= ()  =>  {
    this.props.handleCattleDelete(this.props.cattle.id)
  }

  deleteCattle= ()  =>  {
    notification.confirm({
      message: 'Are you sure you want to delete this cattle?',
      callback: this.deleteCattleHelper
    });
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


  render() {
    return (
        <Page
            renderToolbar={() =>
              <CattleEditTopBar title='Edit Cattle' navigator={this.props.navigator}
              backFunction={this.endEditing} editFunction={this.updateData} deleteFunction={this.deleteCattle}/>}>

          <div style={styles.image_container}></div>
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
    backgroundImage: 'url(img/icon.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white',
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


export default connect(mapStateToProps, mapDispatchToProps)(EditCattlePage);
