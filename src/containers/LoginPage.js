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

import TopBar from '../components/TopBar';
import { loginUser } from '../actions/index';

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

  static propTypes = {
    token: React.PropTypes.string,
    handleLogin: React.PropTypes.func,
  };

  handleSubmit() {
    this.props.handleLogin({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  error() {
    return this.props.error?
        <div>
          <h2> Error :( </h2>
          <p> {this.props.error.responseText}</p>
        </div>
        :
        null;
  }

  render() {
    return (
        <Page renderToolbar={() => <TopBar title='Login' navigator={navigator} />}>
          <div style={styles.page_content}>
            <Row style={{'height': '20%'}}>
              <div className='center'>
                <img src='img/logo.jpg' style={styles.logo_img}/>
              </div>
            </Row>
            <Row style={{'height': '80%'}}>
              <Row style={{'height': '30%'}}>
                {this.error()}
              </Row>
              <Row style={{'height': '5%'}}>
                <Input ref="email" placeholder="Email" type="text" modifier="underbar" style={{width:'100%'}}/>
              </Row>
              <Row style={{'height': '5%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Input ref="password" placeholder="Password" type="password" modifier="underbar" style={{width:'100%'}}/>
              </Row>
              <Row style={{'height': '20%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Button id='signIn' onClick={() => {
                this.handleSubmit();
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