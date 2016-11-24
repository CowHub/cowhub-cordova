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
    ProgressCircular,
    Modal

} from 'react-onsenui';

import TopBar from '../components/TopBar';
import CreateCattlePage from './CreateCattlePage'
import IdentifyCattlePage from './IdentifyCattlePage'
import CattleList from '../components/cattle/CattleList'
import EditCattlePage from './EditCattlePage'

import {
    fetchCattle
} from '../actions/cattle';

const mapStateToProps = (state) => {
  return {
    cattleSize: state.cattle.cattle.length,
    isFetching: state.cattle.fetching,
    isEditing: state.cattle.editing
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
    this.props.navigator.pushPage({component: CreateCattlePage,key:'CREATE_CATTLE_PAGE',title:'CREATE_CATTLE_PAGE'
      ,navigator:this.navigator})
  }

  handleCameraClick() {
    this.props.navigator.pushPage({component: IdentifyCattlePage,key:'IDENTIFY_CATTLE_PAGE',title: 'IDENTIFY_CATTLE_PAGE'
      ,navigator:this.navigator})
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
        <CattleList navigator={this.props.navigator}/>
      </div>

      <Modal isOpen={this.props.isEditing}>
        <EditCattlePage/>
      </Modal>

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