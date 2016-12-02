import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
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
    loadMyHerdPage,
    
} from'../actions/index'

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMyHerdPage: ()  =>  {
      dispatch(loadMyHerdPage())
    }
  }
};


class VerifyImagePage extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  backFunction = () =>  {
    this.props.loadMyHerdPage();
  };




  render() {
    return (
        <Page modifier="transparent"
              renderToolbar={() => <CattleEditTopBar title='Verify Cattle' backFunction={this.backFunction} />}>
          <img style={styles.reviewImage} src={this.props.camera.image}/>
        </Page>
    )
  }


}
const styles = {
  reviewImage: {
    position: 'fixed',
    height: '70%',
    width: '70%',
    margin: '0 auto',
    left: '0',
    right: '0'
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(VerifyImagePage);
