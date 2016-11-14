import React from 'react';

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

const LoginPage = ({navigator}) => (
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
            <Input placeholder="Email" type="text" modifier="underbar" float/>

          </Row>
          <Row style={{'height': '5%'}}></Row>
          <Row style={{'height': '5%'}}>
            <Input placeholder="Password" type="password" modifier="underbar"/>
          </Row>
          <Row style={{'height': '20%'}}></Row>
          <Row style={{'height': '5%'}}>
            <Button id='signIn' className='signIn' modifier="large">Sign In</Button>
          </Row>
        </Row>
      </div>
    </Page>
);

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

export default LoginPage;