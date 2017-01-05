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
    Fab,
    PullHook,
    ProgressCircular,
    Modal,
    Popover

} from 'react-onsenui';

import TopBar from '../components/TopBar';
import CattleList from '../components/cattle/CattleList';
import {
    fetchCattle,
    loadEditCattlePage,
    logoutUser,
    loadLoginPage,
    startCreateCattle,
    startIdentifyCattle,
    cattleErrorSeen
} from '../actions/index';


const mapStateToProps = (state) => {
  return {
    cattleSize: state.cattle.cattle.length,
    isFetching: state.cattle.fetching,
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCattle: () => {
      dispatch(fetchCattle());
    },
    createCattle:() => { dispatch(startCreateCattle()) },
    editCattle:() => { dispatch(loadEditCattlePage()) },
    identifyCattle:() => { dispatch(startIdentifyCattle()) },
    handleLogout:() => {
      dispatch(logoutUser());
      dispatch(loadLoginPage());
    },
    handleErrorSeen: (params) => {
      dispatch(cattleErrorSeen());
    }
  }
};


class MyHerdPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      state: 'initial'
    };
  }

  static propTypes = {
    token: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string
  };

  componentWillMount() {
    this.props.fetchCattle();
    // Check for Errors
    this.handleError(this.props);
  }

  componentWillReceiveProps(props) {
    // Check for Errors
    this.handleError(props);
  }

  handleNewClick() {
    this.props.createCattle();
  }

  handleCameraClick() {
    this.props.identifyCattle();
  }


  handleChange(e) {
    this.setState({
      state: e.state
    });
  }

  handleLoad(done) {
    this.props.fetchCattle();
    setTimeout(done, 1000);
  }

  handleLogout = () => {
    this.props.handleLogout();
  };

  handleError(props) {
    return props.isError ?
        notification.alert({
          message: 'Error: ' + (props.isError.responseJSON ? props.isError.responseJSON.errors[0] : props.isError.responseText),
          callback: props.handleErrorSeen
        })
        :
        null;
  }


  get content() {
    switch (this.state.state) {
      case 'initial':
        return 'Pull to refresh';
      case 'preaction':
        return 'Release';
      case 'action':
        return 'Loading...';
    }
  }

  renderLoadingSpiral() {
    return (this.props.isFetching ? <ProgressCircular indeterminate/> : null);
  }

  render() {

    return (
        <Page renderToolbar={() => <TopBar title='My Herd' optionsMenu={true} logoutFunction={this.handleLogout} />}>
          <PullHook
              onChange={this.handleChange.bind(this)}
              onLoad={this.handleLoad.bind(this)}
              height={100}
              thresholdHeight={150}>
            {this.content}
          </PullHook>

          <div style={styles.page_content}>
            {this.renderLoadingSpiral()}
            <CattleList navigator={this.props.navigator}/>
          </div>

          <Fab
              onClick={() => this.handleNewClick()}
              position='bottom right'>
            <Icon icon='md-file-plus'/>
          </Fab>
          <Fab
              onClick={() =>this.handleCameraClick()}
              position='bottom left'>
            <Icon icon='md-camera'/>
          </Fab>
        </Page>
    )
  }
}


const styles = {
  logo_img: {
    marginTop: '10%',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  page_content: {
    textAlign: 'center',
    width: '80%',
    margin: '0 auto 0',
    height: '90%'
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(MyHerdPage);
