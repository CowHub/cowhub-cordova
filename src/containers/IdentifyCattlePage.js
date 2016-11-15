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

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {}
};


class IdentifyCattlePage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };



  render()  {
    return (
        <Page renderToolbar={() => <TopBar title='Identify Cattle' navigator={this.props.navigator} backButton="true" />}>
          <div style={styles.page_content}>
            <Row style={{'height': '20%'}}>
              <h2>Identify Cattle</h2>
            </Row>
            <Row style={{'height': '80%'}}>
            </Row>
          </div>

        </Page>
    )
  }

  // redirectUser()  {
  //   return (
  //       <Page>
  //       <MyHerdPage />
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


export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattlePage);
