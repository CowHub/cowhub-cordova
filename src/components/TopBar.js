import React from 'react';

import {
    Toolbar,
    BackButton,
    ToolbarButton,
    Icon,
    Popover,
    List,
    ListItem
} from 'react-onsenui';

class TopBar extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    backFunction: React.PropTypes.func,
    logoutFunction: React.PropTypes.func,
    optionsMenu: React.PropTypes.bool,
  };
  static defaultProps = {
    backFunction: null,
    logoutFunction: null,
    optionsMenu: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  getTarget = () => {
    return this.refs.optionsMenu;
  };

  show = () => {
    this.setState({isOpen: true});
  };

  hide = () => {
    this.setState({isOpen: false});
  };


  render() {
    return (<Toolbar>
      {this.props.backFunction ?
          <div className='left'>
            <BackButton onClick={() =>this.props.backFunction()}>Back</BackButton>
          </div> : null
      }
      <div className='center'>{this.props.title}</div>


      {this.props.optionsMenu ?
          <div className='right'>
            <ToolbarButton ref='optionsMenu'>
              <Icon icon='md-more-vert' onClick={this.show}></Icon>
            </ToolbarButton>
            <Popover
                isOpen={this.state.isOpen}
                onCancel={this.hide}
                isCancelable={true}
                getTarget={this.getTarget}
            >
              <List>
                <ListItem modifier="tappable" onClick={() => this.props.logoutFunction()}>
                  <Icon icon='fa-sign-out'/>
                  <div className='right'>Logout</div>
                </ListItem>
              </List>

            </Popover>
          </div>
          : null}
    </Toolbar>)
  }
}

export default TopBar;