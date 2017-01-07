import React from 'react';
import { connect } from 'react-redux';
import { notification } from 'onsenui';
import { Page, Toolbar, BackButton } from 'react-onsenui';

import CustomPropTypes from '../utilities/CustomPropTypes';
import { handleError } from '../utilities/ErrorHandler';

import CattleDetail from '../components/cattle/CattleDetail';

import { cancelIdentify } from '../actions'

const mapStateToProps = (state) => {
  return {
    cattle: state.identification.match,
    image: state.identification.image,
    error: state.cattle.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    backFunction: () => dispatch(cancelIdentify())
  }
};

class IdentifyCattleSuccessPage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string,
    error: React.PropTypes.object
  };

  componentWillMount() {
    handleError(this.props.error);
  }

  componentWillReceiveProps(props) {
    handleError(props.error);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={ () => this.props.backFunction() }/>
        </div>
        <div className='center'>Match Found</div>
      </Toolbar>
    );
  }

  renderCattleDetail() {
    return (
      <CattleDetail
        cattle={ this.props.cattle }
        image={ this.props.image }
        isEditing={ false }
      />
    );
  }

  render() {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        { this.renderCattleDetail() }
      </Page>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyCattleSuccessPage);
