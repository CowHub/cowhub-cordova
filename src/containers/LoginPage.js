import React from 'react';
import {connect} from 'react-redux';
import {
    Page,
    Button,
    Toolbar,
    Icon,
    Input,
    ToolbarButton,
    Row,
    Col
} from 'react-onsenui';

import TopBar from '../components/TopBar'

const mapStateToProps = (state) => {
  return {
    ...state.authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (p) => {
      dispatch(loginUser(p))
    },
  };
};


class LoginPage extends React.Component {

  render() {
    return (
        <Page renderToolbar={() => <TopBar title='Login' navigator={navigator} />}>
          <div style={styles.page_content}>
            <Row style={{'height': '40%'}}>
              <div className='center'>
                <img src='img/logo.jpg' style={styles.logo_img}/>
              </div>
            </Row>
            <Row style={{'height': '60%'}}>
              <Row style={{'height': '30%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Input ref="email" placeholder="Email" type="text" modifier="underbar" float/>

              </Row>
              <Row style={{'height': '5%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Input ref="password" placeholder="Password" type="password" modifier="underbar"/>
              </Row>
              <Row style={{'height': '20%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Button id='signIn' onClick={() => {
                handleLogin();
              }} className='signIn' modifier="large">Sign In</Button>
              </Row>
            </Row>
          </div>
        </Page>
    )
  }
}
;

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
    height: '90%'
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);