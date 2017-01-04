import React from 'react';

import {
    Toolbar,
    BackButton,
    ToolbarButton,
    Icon
} from 'react-onsenui';


class CattleEditTopBar extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    backFunction: React.PropTypes.func,
    editFunction: React.PropTypes.func
  };
  static defaultProps = {
    backFunction: null,
    editFunction: null,
    deleteFunction: null
  };


  render() {
    return (<Toolbar>
      {this.props.backFunction ?
          <div className='left'>
            <BackButton onClick={() =>this.props.backFunction()}>Back</BackButton>
          </div> : null
      }
      <div className='center'>{this.props.title}</div>

      <div className='right'>
        {this.props.deleteFunction ?
            <ToolbarButton>
              <Icon icon='trash' onClick={() => this.props.deleteFunction()}></Icon>
            </ToolbarButton>
            : null}
        {this.props.editFunction ?
            <ToolbarButton>
              <Icon icon='edit' onClick={() => this.props.editFunction()}></Icon>
            </ToolbarButton>
            : null}
      </div>
    </Toolbar>)
  }
}

export default CattleEditTopBar;
