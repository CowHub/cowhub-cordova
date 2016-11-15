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
    Col
} from 'react-onsenui';

import TopBar from '../components/TopBar';
import {
    loginUser,
    enterEmail,
    enterPassword,
    submitPressed
} from '../actions/index';
import HomeScreen from './HomeScreen'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmail: (email) => {
      dispatch(enterEmail(email));
    },
    handlePassword: (password) => {
      dispatch(enterPassword(password))
    },
    handleLogin: (params) => {
      dispatch(loginUser(params));
      dispatch(submitPressed());
    },
  };
};


class LoginPage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  componentWillMount() {
    this.handleAuthenticated(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleAuthenticated(props);
  }

  handleAuthenticated(props) {
    if (props.authentication.token) {
      props.navigator.pushPage({comp: HomeScreen,key:'HOME_SCREEN'});
    }
  }

  submit() {
    this.props.handleLogin({
      email: this.props.login.email,
      password: this.props.login.password
    })
  }


  error() {
    return this.props.authentication.error?
        <div>
          <h2> Error :( </h2>
          <p> {this.props.authentication.error.responseJSON.errors[0]}</p>
        </div>
        :
        null;
  }

  render()  {
    return (
        <Page renderToolbar={() => <TopBar title='Login' navigator={this.props.navigator} />}>
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
                <Input ref="email" placeholder="Email" type="text" modifier="underbar" onChange={(event) => {
                this.props.handleEmail(event.target.value)
                }} style={{width:'100%'}}/>
              </Row>
              <Row style={{'height': '5%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Input ref="password" placeholder="Password" type="password" modifier="underbar" onChange={(event) =>
                this.props.handlePassword(event.target.value)} style={{width:'100%'}}/>
              </Row>
              <Row style={{'height': '20%'}}></Row>
              <Row style={{'height': '5%'}}>
                <Button id='signIn' onClick={
                () => this.submit() } className='signIn' modifier="large">Sign In</Button>
              </Row>
            </Row>
          </div>
        </Page>
    )
  }

  // redirectUser()  {
  //   return (
  //       <Page>
  //       <HomeScreen />
  //         </Page>
  //   );
  // }
  //
  //
  // checkRedirect() {
  //   return this.props.authentication.token? this.redirectUser() : this.renderPage();
  // }
  //
  // render() {
  //   return this.checkRedirect()
  // }

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