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

  renderRefreshButton() {
    return (ons.platform.isIOS() &&
      <div className="left">
        <Icon icon="ion-ios-refresh" style={styles.refresh}
              onClick={() => this.props.fetchCattle()}/>
      </div>)
  }

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
        { this.renderRefreshButton() }
        { this.renderTitle() }
        { this.renderRightButton() }
      </Toolbar>
    );
  }
}

const styles = {
  refresh: {
    margin: '0 25px',
    color: 'rgb(66, 139, 202)'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTopBar);
