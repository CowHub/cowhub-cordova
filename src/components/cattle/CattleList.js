import React from 'react';
import CustomPropTypes from '../../utilities/CustomPropTypes'
import CattleListItem from './CattleListItem'

class CattleList extends React.Component {
  static propTypes = {
    cattle: React.PropTypes.arrayOf(CustomPropTypes.cattle),
    isFetching: React.PropTypes.bool,
    isImageFetching: React.PropTypes.bool,
    handleEdit: React.PropTypes.func
  };

  renderCattle() {
    return this.props.cattle.map((o, i) => {
      return (
        <CattleListItem  key={ i } id={ i }
          cattle={ o.cattle }
          isImageFetching={ this.props.isImageFetching }
          handleEdit={ (id) => this.props.handleEdit(id) }
        />
      );
    });
  };

  render() {
    return (
      <div>
        {this.renderCattle()}
      </div>
    )
  }
}

export default CattleList;
