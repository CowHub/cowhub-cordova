import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
import { Page, Toolbar, BackButton } from 'react-onsenui';

import CattleEditForm from '../components/cattle/CattleEditForm';
import { cancelIdentify } from'../actions'
import CustomPropTypes from '../utilities/CustomPropTypes'

const mapStateToProps = (state) => {
  return {
    cattle: state.identification.match,
    image: state.identification.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    backFunction: (pos) => {
      dispatch(cancelIdentify(pos));
    },
  }
};


class IdentifyCattleSuccessPage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle
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

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={ () => this.props.backFunction() }>Back</BackButton>
        </div>
        <div className='center'>Match Found</div>
      </Toolbar>
    )
  }

  render() {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        <div style={styles.image_container}>
          <img style={ styles.reviewImage } src={this.props.image ? this.props.image : 'img/icon.png'}/>
        </div>
        <CattleEditForm cattle={this.props.cattle}/>
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
    height: '250px',
    overflow: 'hidden'
  },
  reviewImage: {
    position: 'fixed',
    height: '100vw',
    margin: '0 auto',
    left: '0',
    right: '0',
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

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattleSuccessPage);
