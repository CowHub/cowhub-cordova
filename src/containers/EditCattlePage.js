import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'onsenui';
import { Page, ProgressCircular } from 'react-onsenui';

import CattleEditTopBar from '../components/cattle/CattleEditTopBar';
import CattleDetail from '../components/cattle/CattleDetail';
import CustomPropTypes from '../utilities/CustomPropTypes'

import { endEditCattle, updateCattle, deleteCattle, cattleErrorSeen } from'../actions'

const mapStateToProps = (state) => {
  return {
    ...state.cattle.cattle[state.cattle.cattlePos],
    isEditing: state.cattle.editing,
    isError: state.cattle.error,
    isFetching: state.cattle.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEndEdit: (pos) => { dispatch(endEditCattle(pos)) },
    handleCattleUpdate: (props) => { dispatch(updateCattle(props.cattle.id, props.cattle)) },
    handleCattleDelete: (id) => { dispatch(deleteCattle(id)) },
    handleErrorSeen: (params) => { dispatch(cattleErrorSeen()) }
  }
};

class EditCattlePage extends React.Component {

  static propTypes = {
    cattle: CustomPropTypes.cattle
  };
  static defaultProps = {
    cattle: {
      id: '',
      check_digit: '',
      country_code: '',
      herdmark: '',
      individual_number: '',
    }
  };

  componentWillMount() {
    this.handleError(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleError(props);
  }

  handleError(props) {
    return props.isError
      ? notification.alert({
        title: 'Error',
        message: props.isError.responseJSON ? props.isError.responseJSON.errors[0] : props.isError.responseText,
        callback: props.handleErrorSeen
      })
      : null;
  }

  renderToolbar() {
    return (
      <CattleEditTopBar
        title='Edit Cattle'
        backFunction={ () => this.props.handleEndEdit() }
        editFunction={ () => this.props.handleCattleUpdate(this.props) }
        deleteFunction={ () => notification.confirm({
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
