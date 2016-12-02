import React from 'react';
import { connect } from 'react-redux';
import {
    Page,
    Button,
    Toolbar,
    Icon,
    Input,
    ToolbarButton,
    Row,
    Col,
    List,
    ListItem

} from 'react-onsenui';

import {editCattle} from'../../actions/cattle'
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.cattle.cattle[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEdit: (id) => {
      dispatch(editCattle(id));
    }
  };
};


class CattleEditItem extends React.Component {

  static propTypes = {
    cattle: React.PropTypes.shape({
      breed: React.PropTypes.string,
      check_digit: React.PropTypes.number.isRequired,
      country_code: React.PropTypes.string.isRequired,
      dob: React.PropTypes.string,
      gender: React.PropTypes.string,
      herdmark: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
      individual_number: React.PropTypes.number.isRequired,
      name: React.PropTypes.string,
      images: React.PropTypes.arrayOf(React.PropTypes.string),
    }).isRequired
  };
  static defaultProps = {
    cattle: {
      id: -1,
      check_digit: -1,
      country_code: '',
      herdmark: '',
      individual_number: -1,
    }
  };

  editCow() {
    this.props.handleEdit(this.props.id);
  }

  render() {
    const {
        country_code,
        herdmark,
        check_digit,
        id,
        individual_number,
        name,
        images,
    } = this.props.cattle;

    return (
        <ListItem style={styles.listItemContainer} modifier="tappable chevron" onClick={() =>this.editCow()}  >
          <Row>
            <Col width="95px">
              <img src="img/icon.png" style={styles.thumbnail} ></img>
            </Col>
            <Col>
              <div style={styles.name}>
                Herdmark: {herdmark}
              </div>
              <div style={styles.desc}>
                Country Code: {country_code}
              </div>
                <div style={styles.desc}>
                Check Digit :{check_digit}
                </div>
                  <div style={styles.desc}>
                Individual Number : {individual_number}

              </div>
            </Col>
            <Col width="40px"></Col>
          </Row>
        </ListItem>)
    }
  }

const styles ={
        listItemContainer: {
            lineHeight: '1',
            padding: '15px 0px 15px 15px'
        },
        thumbnail: {
          width: '80px',
          height: '80px',
          borderRadius: '4px'
        },
        name: {
          fontWeight: '500',
          lineHeight: '16px',
          fontSize: '15px',
          marginBottom: '6px'
        },
        desc: {
          lineHeight: '1.2',
          fontSize: '13px'
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(CattleEditItem);