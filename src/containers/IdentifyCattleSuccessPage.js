import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import { Page, Toolbar, BackButton } from 'react-onsenui';

import CustomPropTypes from '../utilities/CustomPropTypes';
import CattleDetail from '../components/cattle/CattleDetail';

import { cancelIdentify } from'../actions'

const mapStateToProps = (state) => {
  return {
    cattle: state.identification.match,
    image: state.identification.image
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    backFunction: (pos) => { dispatch(cancelIdentify(pos)) },
  }
};

class IdentifyCattleSuccessPage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string
  };

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={ () => this.props.backFunction() }>Back</BackButton>
        </div>
        <div className='center'>Match Found</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        <CattleDetail
          cattle={ this.props.cattle }
          image={ this.props.image }
        />
      </Page>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattleSuccessPage);
