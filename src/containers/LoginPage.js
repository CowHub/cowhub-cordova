import React from 'react';
import {connect} from 'react-redux';
import { notification } from 'onsenui';
import { Page, Button, Toolbar, Icon, Input, Row } from 'react-onsenui';

import { loginUser, loginErrorSeen, enterEmail, enterPassword, submitPressed,
  initialTokenCheck } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    email: state.login.email,
    password: state.login.password,
    isFetching: state.authentication.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmail: (email) => { dispatch(enterEmail(email)) },
    handlePassword: (password) => { dispatch(enterPassword(password)) },
    handleLogin: (params) => {
      dispatch(loginUser(params));
      dispatch(submitPressed());
    },
    handleErrorSeen: (params) => { dispatch(loginErrorSeen()) },
    handleFetchToken: () => { dispatch(initialTokenCheck()) }
  };
};

class LoginPage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    isFetching: React.PropTypes.bool
  };

  componentWillMount() {
    this.handleError(this.props);
  }

  componentDidMount() {
    if (!this.props.isFetching)
      this.props.handleFetchToken();
  }

  componentWillReceiveProps(props) {
    this.handleError(props);
  }

  handleError(props) {
    return props.error
      ? notification.alert({
        title: 'Error',
        message: props.error.responseJSON ? props.error.responseJSON.errors[0] : props.error.responseText,
        callback: props.handleErrorSeen
      })
      : null;
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Login</div>
      </Toolbar>
    );
  }

  renderLogo() {
    return (
      <Row style={{'height': '20%'}}>
        <div className='center'>
          <img src='img/logo.jpg' style={ styles.logo_img }/>
        </div>
      </Row>
    );
  }

  renderForm() {
    return (
      <Row style={{'height': '80%'}}>
        <Row style={{'height': '30%'}}/>
        <Row style={{'height': '5%'}}>
          { this.renderEmailInput() }
        </Row>
        <Row style={{'height': '5%'}}/>
        <Row style={{'height': '5%'}}>
          { this.renderPasswordInput() }
        </Row>
        <Row style={{'height': '20%'}}/>
        <Row style={{'height': '5%'}}>
          { this.renderButton() }
        </Row>
      </Row>
    );
  }

  renderEmailInput() {
    return (
      <Input ref='email' placeholder='Email' type='text'
        value={this.props.email} modifier='underbar'
        onChange={ (event) => this.props.handleEmail(event.target.value) }
        style={{width:'100%'}}
      />
    );
  }

  renderPasswordInput() {
    return (
      <Input ref='password' placeholder='Password' type='password'
        value={this.props.password} modifier='underbar'
        onChange={ (event) => this.props.handlePassword(event.target.value) }
        style={{width:'100%'}}
      />
    );
  }

  renderButton() {
    return (
      <Button id='signIn' className='signIn' modifier='large'
        onClick={ () => this.props.handleLogin({
          email: this.props.email,
          password: this.props.password
        })}
      >
        Sign In
      </Button>
    );
  }

  render()  {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        <div style={styles.page_content}>
          { this.renderLogo() }
          { this.renderForm() }
        </div>
      </Page>
    );
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
    height: '90%'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
