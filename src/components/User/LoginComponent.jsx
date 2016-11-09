require('./LoginComponent.scss');

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    ...state.authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (p) => { dispatch(loginUser(p)) },
  };
};

class LoginComponent extends Component {

  static displayName = 'Login Component';
  static propTypes = {
    token: React.PropTypes.string,
    handleLogin: React.PropTypes.func,
  };

  componentWillMount() {
    this.handleAuthenticated(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleAuthenticated(props);
  }

  handleAuthenticated(props) {
    if (props.token) {
      console.log('Redirecting... you are authenticated already.')
      window.location = '/';
    }
  }

  handleSubmit() {
    this.props.handleLogin({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  render() {
    return (
      <div className="login-component-wrapper" >
        <div className="login-component-title" >Log in</div>
        <input
          ref="email" className="login-component-input"
          type="email" placeholder="Email" />
        <input
          ref="password" className="login-component-input"
          type="password" placeholder="Password" />
        <button
          onClick={ () => this.handleSubmit() } className="login-component-button-submit" >
          Log In
        </button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
