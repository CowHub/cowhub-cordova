import React from 'react';

import { Toolbar } from 'react-onsenui';
import HamburgerButton from './HamburgerButton'

class MainTopBar extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    handleLogout: React.PropTypes.func
  };

  renderTitle() {
    return (
      <div className='center'>
        { this.props.title }
      </div>
    );
  }

  renderRightButton() {
    return (
      <HamburgerButton
        options={[
          {
            icon: 'fa-sign-out',
            title: 'Logout',
            onClick: this.props.handleLogout
          }
        ]}
      />
    );
  }

  render() {
    return (
      <Toolbar>
        { this.renderTitle() }
        { this.renderRightButton() }
      </Toolbar>
    );
  }
}

export default MainTopBar;
