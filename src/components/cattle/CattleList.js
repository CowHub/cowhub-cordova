import React from 'react';
import { connect } from 'react-redux';



import CattleListItem from './CattleListItem'


const mapStateToProps = (state) => {
  return {
    cattleSize: state.cattle.cattle.length,
    isFetching: state.cattle.fetching,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
  }
};


class CattleList extends React.Component {

  renderCattle() {
    let cattle = [];
    if (this.props.cattleSize > 0) {
      let counter = 0;
      while (counter < this.props.cattleSize) {
        cattle.push(<CattleListItem  key={ counter } id={ counter } navigator={this.props.navigator} />);
        counter += 1;
      }
    }
    return cattle;
  }

  render() {

    return (
        <div>
          {this.renderCattle()}
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CattleList);
