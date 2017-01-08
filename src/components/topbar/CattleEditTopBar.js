import React from 'react';

import {
    Toolbar,
    BackButton,
    ToolbarButton,
    Icon
} from 'react-onsenui';
import HamburgerButton from './HamburgerButton'

class CattleEditTopBar extends React.Component {
  static propTypes = {
    isEditing: React.PropTypes.bool,
    handleEnableEdit: React.PropTypes.func,
    handleDone: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    handleBack: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
  };

  renderTitle(title) {
    return (
      <div className='center'>{ title }</div>
    );
  }

  renderCancelButton() {
    return (
      <div className='left'>
        <ToolbarButton onClick={ this.props.handleCancel }>
          <Icon icon='md-close-circle' />
        </ToolbarButton>
      </div>
    );
  }

  renderDoneButton() {
    return (
      <div className='right'>
        <ToolbarButton onClick={ this.props.handleDone }>
          <Icon icon='md-check' />
        </ToolbarButton>
      </div>
    );
  }

  renderBackButton() {
    return (
      <div className='left'>
        <BackButton onClick={ this.props.handleBack }/>
      </div>
    );
  }

  renderHamburger() {
    return (
      <div className='right'>
      <HamburgerButton
        options={[
          {
            icon: 'edit',
            title: 'Edit',
            onClick: this.props.handleEnableEdit
          },
          {
            icon: 'trash',
            title: 'Delete',
            onClick: this.props.handleDelete
          },
        ]}
      />
      </div>
    );
  }

  render() {
    if (this.props.isEditing)
      return (
        <Toolbar>
          { this.renderCancelButton() }
          { this.renderTitle('Edit') }
          { this.renderDoneButton() }
        </Toolbar>
      );

    return (
      <Toolbar>
        { this.renderBackButton() }
        { this.renderTitle('Cattle Details') }
        { this.renderHamburger() }
      </Toolbar>
    );
  }
}

export default CattleEditTopBar;
