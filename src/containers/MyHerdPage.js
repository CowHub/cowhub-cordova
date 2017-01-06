import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
import { Page, Icon, Fab, PullHook, ProgressCircular } from 'react-onsenui';

import TopBar from '../components/TopBar';
import CattleList from '../components/cattle/CattleList';
import {
    fetchCattle,
    loadEditCattlePage,
    logoutUser,
    loadLoginPage,
    startCreateCattle,
    startIdentifyCattle,
    cattleErrorSeen,
    editCattle
} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    cattle: state.cattle.cattle,
    isFetching: state.cattle.fetching,
    isImageFetching: state.cattle.imageFetching,
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCattle: () => { dispatch(fetchCattle()) },
    createCattle:() => { dispatch(startCreateCattle()) },
    editCattle: () => { dispatch(loadEditCattlePage()) },
    identifyCattle: () => { dispatch(startIdentifyCattle()) },
    handleEdit: (id) => { dispatch(editCattle(id)) },
    handleLogout:() => {
      dispatch(logoutUser());
      dispatch(loadLoginPage());
    },
    handleErrorSeen: (params) => { dispatch(cattleErrorSeen()) }
  }
};

class MyHerdPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { state: 'initial' };
  }

  componentWillMount() {
    this.props.fetchCattle();
    this.handleError(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleError(props);
  }

  handleError(props) {
    return props.isError
      ? notification.alert({
        title: 'Error',
        message: props.isError.responseJSON ? props.isError.responseJSON.errors[0] : props.isError.responseText,
        callback: props.handleErrorSeen
      })
      : null;
  }

  renderToolbar() {
    return (
      <TopBar title='My Herd' optionsMenu={true}
        logoutFunction={ () => this.props.handleLogout() }
      />
    );
  }

  renderPullHook() {
    return (
      <PullHook
          onChange={ (e) => this.setState({ state: e.state }) }
          onLoad={ (done) => {
            this.props.fetchCattle();
            setTimeout(done, 1000);
          }}
          height={100}
          thresholdHeight={150}>
        { this.content }
      </PullHook>
    );
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

  renderCattleList() {
    return (
      <div style={styles.page_content}>
        { this.props.isFetching ? <ProgressCircular indeterminate/> : null }
        <CattleList
          cattle={ this.props.cattle }
          isFetching={ this.props.isFetching }
          isImageFetching={ this.props.isImageFetching }
          handleEdit={ (id) => this.props.handleEdit(id) }
        />
      </div>
    );
  }

  renderIdentifyButton() {
    return (
      <Fab
        onClick={ () => this.props.identifyCattle() }
        position='bottom left'
      >
        <Icon icon='md-camera'/>
      </Fab>
    );
  }

  renderCreateButton() {
    return (
      <Fab
        onClick={ () => this.props.createCattle() }
        position='bottom right'
      >
        <Icon icon='md-file-plus'/>
      </Fab>
    );
  }

  render() {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        { this.renderPullHook() }
        { this.renderCattleList() }
        { this.renderIdentifyButton() }
        { this.renderCreateButton() }
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
