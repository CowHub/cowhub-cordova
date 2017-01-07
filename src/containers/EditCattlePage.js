import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
import { Page, ProgressCircular } from 'react-onsenui';

import CustomPropTypes from '../utilities/CustomPropTypes';
import { handleError } from '../utilities/ErrorHandler';

import CattleDetail from '../components/cattle/CattleDetail';
import CattleEditTopBar from '../components/topbar/CattleEditTopBar';

import { startEditCattle, endEditCattle, updateCattle, deleteCattle } from '../actions'

const mapStateToProps = (state) => {
  return {
    cattle: state.cattle.cattlePos == null ? { images: [] }
      : state.cattle.cattle[state.cattle.cattlePos].cattle,
    error: state.cattle.error,
    isEditing: state.cattle.editing,
    isFetching: state.cattle.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStartEdit: () => dispatch(startEditCattle()),
    handleEndEdit: () => dispatch(endEditCattle()),
    handleCattleUpdate: (props) => dispatch(updateCattle(props.cattle.id, props.cattle)),
    handleCattleDelete: (id) => dispatch(deleteCattle(id))
  }
};

class EditCattlePage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle,
    error: React.PropTypes.object,
    isEditing: React.PropTypes.bool,
    isFetching: React.PropTypes.bool
  };

  componentWillMount() {
    handleError(this.props.error);
  }

  componentWillReceiveProps(props) {
    handleError(props.error);
  }

  renderToolbar() {
    return (
      <CattleEditTopBar
        isEditing={ this.props.isEditing }
        handleEnableEdit={ () => this.props.handleStartEdit() }
        handleDone={ () => this.props.handleCattleUpdate(this.props) }
        handleCancel={ () => notification.confirm({
            message: 'Returning will discard your changes, do you wish to proceed?',
            callback: (res) => { if (res)
              this.props.handleEndEdit(); }
        })}
        handleBack={ () => this.props.handleEndEdit() }
        handleDelete={ () => notification.confirm({
            message: 'Are you sure you want to delete this cattle?',
            callback: (res) => { if (res)
              this.props.handleCattleDelete(this.props.cattle.id); }
        })}
      />
    );
  }

  renderLoadingSpiral() {
    if (this.props.isFetching)
      return <ProgressCircular indeterminate />;
  }

  renderCattleDetail() {
    let img = this.props.cattle.images;
    let src = img ? (img[0] ? img[0].data : null) : null;
    return (
      <CattleDetail
        cattle={ this.props.cattle }
        image={ src }
        isEditing={ this.props.isEditing }
        handleChange={ (key, val) => this.props.cattle[key] = val }
      />
    );
  }

  render() {
    return (
      <Page renderToolbar={ () => this.renderToolbar() }>
        { this.renderLoadingSpiral() }
        { this.renderCattleDetail() }
      </Page>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCattlePage);
