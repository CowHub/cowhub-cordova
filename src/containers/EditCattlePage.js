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
    ListItem

} from 'react-onsenui';

import TopBar from '../components/TopBar';
import endEditCattle from'../actions/cattle'
const mapStateToProps = (state) => {
  return {
    ...state.cattle.cattle[state.cattle.cattlePos],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEndEdit: (pos) => {
      dispatch(endEditCattle(pos));
    },
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
    }).isRequired,
  };
  static defaultProps = {
    cattle: {
      id: -1,
      check_digit: -1,
      country_code: '',
      herdmark: '',
      individual_number: -1,
    }
  };



  render()  {
    return (
        <div style={styles.page_content}>

        <List modifier="inset">
          <div style={styles.image_container}></div>
          <ListItem>
            <Input type="text" placeholder="Herdmark" value={this.props.cattle.herdmark} style={styles.textInput} />
          </ListItem>
          <ListItem>
            <Input type="text" placeholder="Country Code" value={this.props.cattle.country_code} style={styles.textInput} />
          </ListItem>
          <ListItem>
            <Input type="text" placeholder="Check Digit" value={this.props.cattle.check_digit} style={styles.textInput} />
          </ListItem>
          <ListItem>
            <Input type="text" placeholder="Individual Number" value={this.props.cattle.individual_number} style={styles.textInput} />
          </ListItem>
        </List></div>


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
