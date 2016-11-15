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
    Col,
    Fab

} from 'react-onsenui';

import TopBar from '../components/TopBar';
import CreateCattlePage from './CreateCattlePage'
import IdentifyCattlePage from './IdentifyCattlePage'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {}
};


class MyHerdPage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  handleNewClick() {
    this.props.navigator.pushPage({comp: CreateCattlePage,key:'CREATE_CATTLE_PAGE'})
  }

  handleCameraClick() {
    this.props.navigator.pushPage({comp: IdentifyCattlePage,key:'IDENTIFY_CATTLE_PAGE'})
  }


  render()  {
    return (
        <Page renderToolbar={() => <TopBar title='My Herd' navigator={this.props.navigator} />}>
          <div style={styles.page_content}>
            <Row style={{'height': '20%'}}>
              <div className='center'>
                <img src='img/logo.jpg' style={styles.logo_img}/>
              </div>
            </Row>
            <Row style={{'height': '80%'}}>
            </Row>
          </div>
          <Fab
              onClick={() => this.handleNewClick()}
              position='bottom right'>
            <Icon icon='md-file-plus' />
          </Fab>
          <Fab
              onClick={() =>this.handleCameraClick()}
              position='bottom left'>
            <Icon icon='md-camera' />
          </Fab>
        </Page>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(MyHerdPage);