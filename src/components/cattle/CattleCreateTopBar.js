import React from 'react';

import {
    Toolbar,
    BackButton,
    ToolbarButton,
    Icon
} from 'react-onsenui';


class CattleCreateTopBar extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    deleteFunction: React.PropTypes.func,
    submitFunction: React.PropTypes.func
  };
  static defaultProps = {
    submitFunction: null,
    deleteFunction: null
  };


  render() {
    return (
        <Toolbar>
          <div className='left'>
            {this.props.deleteFunction ?
                <ToolbarButton>
                  <Icon icon='trash' onClick={() => this.props.deleteFunction()}></Icon>
                </ToolbarButton>
                : null}
          </div>
          <div className='center'>{this.props.title}</div>

          <div className='right'>
            {this.props.submitFunction ?
                <ToolbarButton>
                  <Icon icon='edit' onClick={() => this.props.submitFunction()}></Icon>
                </ToolbarButton>
                : null}
          </div>
        </Toolbar>)
  }
}

export default CattleCreateTopBar;
