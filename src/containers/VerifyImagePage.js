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
    Fab

} from 'react-onsenui';

import CattleEditTopBar from '../components/cattle/CattleEditTopBar'

import {
    backFromVerify,
    imageConfirmed,
} from'../actions/index'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleBack: ()  =>  {
      dispatch(backFromVerify());
    },
    handleVerified: ()  =>  {
      dispatch(imageConfirmed());
    }
  }
};


class VerifyImagePage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  handleBackClick() {
    this.props.handleBack();
  }

  handleVerifyClick()  {
    this.props.handleVerified();
  }



  render() {
    return (
        <Page>
          <img style={styles.reviewImage} src={this.props.camera.image}/>
          <Fab
              onClick={() => this.handleBackClick()}
              position='bottom left'>
            <Icon icon='md-arrow-left' />
          </Fab>
          <Fab
              onClick={() =>this.handleVerifyClick()}
              position='bottom right'>
            <Icon icon='md-check' />
          </Fab>
        </Page>
    )
  }


}
const styles = {
  reviewImage: {
    position: 'fixed',
    height: '70%',
    width: '70%',
    margin: '0 auto',
    left: '0',
    right: '0'
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(VerifyImagePage);
