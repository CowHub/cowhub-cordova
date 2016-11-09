require('./SignUpComponent.scss');

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/index';

const mapStateToProps = (state) => {
  return {
    ...state.authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister: (p) => { dispatch(registerUser(p)) }
  };
};

class SignUpComponent extends Component {

  static displayName = 'Signup Component';
  static propTypes = {
    token: React.PropTypes.string,
    handleRegister: React.PropTypes.func,
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
    this.props.handleRegister({
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.password_confirmation.value
    })
  }

  render() {
    return (
      <div className="signup-component-wrapper" >
        <div className="signup-component-title" >Sign up</div>
        <input
          ref="email" className="signup-component-input"
          type="email" placeholder="Email" />
        <input
          ref="password" className="signup-component-input"
          type="password" placeholder="Password" />
        <input
          ref="password_confirmation" className="signup-component-input"
          type="password" placeholder="Password Confirmation" />
        <button
          onClick={ () => this.handleSubmit() } className="signup-component-button-submit" >
          Sign up
        </button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
