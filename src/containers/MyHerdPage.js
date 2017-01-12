import React from 'react';
import {connect} from 'react-redux';
import {
    Page,
    Icon,
    Fab,
    PullHook,
    ProgressCircular
} from 'react-onsenui';

import { handleError } from '../utilities/ErrorHandler';

import CattleList from '../components/cattle/CattleList';
import MainTopBar from '../components/topbar/MainTopBar';

import {
    fetchCattle,
    logoutUser,
    loadLoginPage,
    startCreateCattle,
    startIdentifyCattle,
    showCattle
} from '../actions';

const mapStateToProps = (state) => {
  return {
    cattle: state.cattle.cattle,
    error: state.cattle.error,
    isFetching: state.cattle.fetching,
    isImageFetching: state.cattle.imageFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCattle: () => dispatch(fetchCattle()),
    createCattle:() => dispatch(startCreateCattle()),
    identifyCattle: () => dispatch(startIdentifyCattle()),
    showCattle: (id) => dispatch(showCattle(id)),
    handleLogout:() => {
      dispatch(logoutUser());
      dispatch(loadLoginPage());
    }
  }
};

class MyHerdPage extends React.Component {

  static propTypes = {
    cattle: React.PropTypes.arrayOf(React.PropTypes.object),
    error: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    isImageFetching: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = { state: 'initial' };
  }

  componentWillMount() {
    this.props.fetchCattle();
    handleError(this.props.error);
  }

  componentWillReceiveProps(props) {
    handleError(props.error);
  }

  renderToolbar() {
    return (
      <MainTopBar title='My Herd'
        handleLogout={ () => this.props.handleLogout() }
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

  renderLoadingSpiral() {
    return (
      <ProgressSpinner
        message='Fetching Cattle'
        shouldDisplay={ this.props.isFetching }
      />
    );
  }

  renderCattleList() {
    return (
      <div style={styles.page_content}>
        <CattleList
          cattle={ this.props.cattle }
          isFetching={ this.props.isFetching }
          isImageFetching={ this.props.isImageFetching }
          handleEdit={ (id) => this.props.showCattle(id) }
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
  page_content: {
    textAlign: 'center',
    width: '80%',
    margin: '0 auto 0',
    height: '90%'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHerdPage);
