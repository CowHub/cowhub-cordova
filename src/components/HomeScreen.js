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

import TopBar from './TopBar'

const HomeScreen = ({navigator}) => (
    <Page renderToolbar={() => <TopBar title='Home' navigator={navigator} />}>
      <div style={styles.page_content}>
        <Row style={{'height': '40%'}}>
          <div className='center'>
            <img src='img/logo.jpg' style={styles.logo_img}/>
          </div>
        </Row>
        <Row style={{'height': '60%'}}>
          <h2>Home</h2>
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

export default HomeScreen;