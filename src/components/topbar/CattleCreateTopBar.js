import React from 'react';

import { Toolbar, ToolbarButton } from 'react-onsenui';

class CattleCreateTopBar extends React.Component {

  static propTypes = {
    handleCancel: React.PropTypes.func,
  };

  renderCancelButton() {
    return (
      <div className='left'>
        <ToolbarButton onClick={ this.props.handleCancel }>
          Cancel
        </ToolbarButton>
      </div>
    );
  }

  renderTitle() {
    return (
      <div className='center'>
        Enter Cattle Details
      </div>
    );
  }

  renderToolbar() {
    return (
      <Toolbar>
        { this.renderCancelButton() }
        { this.renderTitle() }
      </Toolbar>
    );
  }
}

export default CattleCreateTopBar;
