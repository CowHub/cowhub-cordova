import React from 'react';
import {connect} from 'react-redux';
import { notification } from 'onsenui';
import { Page, Button, Toolbar, Icon, Input, Row } from 'react-onsenui';

import { handleError } from '../utilities/ErrorHandler';
import { loginUser, loginErrorSeen, enterEmail, enterPassword, submitPressed,
  initialTokenCheck } from '../actions';

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    email: state.login.email,
    password: state.login.password,
    error: state.authentication.error,
    isFetching: state.authentication.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmail: (email) => dispatch(enterEmail(email)),
    handlePassword: (password) => dispatch(enterPassword(password)),
    handleLogin: (params) => {
      dispatch(loginUser(params));
      dispatch(submitPressed());
    },
    handleErrorSeen: () => dispatch(loginErrorSeen()),
    handleFetchToken: () => dispatch(initialTokenCheck())
  };
};

class LoginPage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    error: React.PropTypes.object,
    isFetching: React.PropTypes.bool
  };

  componentWillMount() {
    handleError(this.props.error);
  }

  componentDidMount() {
    if (!this.props.isFetching)
      this.props.handleFetchToken();
  }

  componentWillReceiveProps(props) {
    handleError(props.error, props.handleErrorSeen);
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
      <img src='img/logo.jpg' style={ styles.logo_img }/>
    );
  }

  renderForm() {
    return (
      <div>
        { this.renderEmailInput() }
        { this.renderPasswordInput() }
        { this.renderButton() }
      </div>
    );
  }

  renderEmailInput() {
    return (
      <Input ref='email' placeholder='Email' type='text'
        value={ this.props.email } modifier='underbar'
        onChange={ (event) => this.props.handleEmail(event.target.value) }
        style={ styles.email_input }
      />
    );
  }

  renderPasswordInput() {
    return (
      <Input ref='password' placeholder='Password' type='password'
        value={this.props.password} modifier='underbar'
        onChange={ (event) => this.props.handlePassword(event.target.value) }
        style={ styles.password_input }
      />
    );
  }

  renderButton() {
    return (
      <Button id='signIn' modifier='large' style={ styles.login_button }
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
    'maxHeight': '100%',
    marginBottom: '40%'
  },
  page_content: {
    textAlign: 'center',
    width: '80%',
    margin: '0 auto 0',
    height: '90%'
  },
  email_input: {
    height: '6.25%',
    width: '100%',
    marginBottom: '20%'
  },
  password_input: {
    height: '6.25%',
    width: '100%',
    marginBottom: '45%'
  },
  login_button: {
    height: '6.25%',
    width: '100%'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
