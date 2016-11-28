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

import CattleEditTopBar from '../components/cattle/CattleEditTopBar'

import {
    backToMyHerdPage,
    } from'../actions/index'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMyHerdPage: ()  =>  {
      dispatch(backToMyHerdPage())
    }
  }
};


class CreateCattlePage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  backFunction = () =>  {
    this.props.loadMyHerdPage();
  };

  render()  {
    return (
        <Page renderToolbar={() => <CattleEditTopBar title='Create Cattle' backFunction={this.backFunction} />}>
          <div style={styles.page_content}>
            <Row style={{'height': '20%'}}>
              <h2>Create Cattle</h2>
            </Row>
            <Row style={{'height': '80%'}}>
            </Row>
          </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(CreateCattlePage);
