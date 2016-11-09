require('./HomeComponent.scss')

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class HomeComponent extends Component {

  static displayName = 'Home Component';

  render() {
    return (
      <div className="home-component-wrapper" >
        Home
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
