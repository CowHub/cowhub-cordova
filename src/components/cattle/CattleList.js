import React from 'react';
import { connect } from 'react-redux';



import CattleListItem from './CattleListItem'


const mapStateToProps = (state) => {
  return {
    cattle: state.cattle.cattle,
    isFetching: state.cattle.fetching,
    isImageFetching: state.cattle.fetching,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    handleEdit: (id) => {
      dispatch(editCattle(id));
    },
  }
};

class CattleList extends React.Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(CattleList);
