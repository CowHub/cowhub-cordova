import React from 'react';
import { connect } from 'react-redux';

import { Toolbar } from 'react-onsenui';
import HamburgerButton from './HamburgerButton'

import {
    Icon
} from 'react-onsenui';

import ons from 'onsenui';

import {
    fetchCattle,
} from '../../actions';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCattle: () => dispatch(fetchCattle()),
  }
};
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
      ons.platform.isIOS() ?
      <HamburgerButton
        options={[
          {
            icon: 'ion-ios-refresh',
            title: 'Refresh',
            onClick: this.props.fetchCattle
          },
          {
            icon: 'fa-sign-out',
            title: 'Logout',
            onClick: this.props.handleLogout
          }
        ]}
      />
      :
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

const styles = {
  refresh: {
    padding: '10px 20px',
    color: 'rgb(66, 139, 202)'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTopBar);
