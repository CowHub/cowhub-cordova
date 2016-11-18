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
    Fab,
    PullHook,
    ProgressCircular

} from 'react-onsenui';

import TopBar from '../components/TopBar';
import CreateCattlePage from './CreateCattlePage'
import IdentifyCattlePage from './IdentifyCattlePage'
import CattleListItem from '../components/cattle/CattleListItem.js'

import {
    fetchCattle
} from '../actions/cattle';

const mapStateToProps = (state) => {
  return {
    cattleSize: state.cattle.cattle.length,
    isFetching: state.cattle.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCattle: () => { dispatch(fetchCattle()); },
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
  }

  handleNewClick() {
    this.props.navigator.pushPage({comp: CreateCattlePage,key:'CREATE_CATTLE_PAGE'})
  }

  handleCameraClick() {
    this.props.navigator.pushPage({comp: IdentifyCattlePage,key:'IDENTIFY_CATTLE_PAGE'})
  }

  renderCattle() {
    let cattle = [];
    if (this.props.cattleSize > 0) {
      let counter = 0;
      while (counter < this.props.cattleSize) {
        cattle.push(<CattleListItem  key={ counter } id={ counter } />);
        counter += 1;
      }
    }
    return cattle;
  }

  renderLoading() {
    return (
        <Page renderToolbar={() => <TopBar title='My Herd' navigator={this.props.navigator} />}>
          <h2>Loading</h2>

    </Page>)
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
    return (this.props.isFetching? <ProgressCircular indeterminate />:null);
  }

  renderPage()  {


    return (

    <Page renderToolbar={() => <TopBar title='My Herd' navigator={this.props.navigator} />}>
      <PullHook
          onChange={this.handleChange.bind(this)}
          onLoad={this.handleLoad.bind(this)}
          height={100}
          thresholdHeight={150}>
        {this.content}
      </PullHook>

      <div style={styles.page_content}>
        {this.renderCattle()}
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


  render()  {

    return (

        this.renderPage()

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