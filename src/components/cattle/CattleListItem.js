import React from 'react';
import {
    Row,
    Col,
    ListItem,
    ProgressCircular
} from 'react-onsenui';
import CustomPropTypes from '../../utilities/CustomPropTypes'

class CattleListItem extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    cattle: CustomPropTypes.cattle,
    isImageFetching: React.PropTypes.bool,
    handleEdit: React.PropTypes.func
  };

  static defaultProps = {
    cattle: {
      id: -1,
      check_digit: -1,
      country_code: '',
      herdmark: '',
      individual_number: -1,
      images: ["img/img.png"],
    }
  };

  renderImage() {
    let img = this.props.cattle.images;
    let src = img ? (img[0] ? img[0].data : null) : null;
    return (
      <Col width="95px">
        { this.props.isImageFetching
          ? <ProgressCircular indeterminate/>
          : <div style={styles.thumbnail}>
              <img src={ src } style={ styles.thumbnailImage }/>
            </div>
        }
      </Col>
    );
  }

  renderDetails() {
    return (
      <Col>
        <div style={ styles.name }>
          Herdmark: { this.props.cattle.herdmark }
        </div>
        <div style={ styles.desc }>
          Country Code: { this.props.cattle.country_code }
        </div>
        <div style={ styles.desc }>
          Check Digit: { this.props.cattle.check_digit }
        </div>
        <div style={ styles.desc }>
          Individual Number: { this.props.cattle.individual_number }
        </div>
      </Col>
    );
  }

  render() {
    return (
      <ListItem
        style={ styles.listItemContainer }
        modifier="tappable chevron"
        onClick={() => this.props.handleEdit(this.props.id) }
      >
        <Row>
          { this.renderImage() }
          { this.renderDetails() }
          <Col width="40px"></Col>
        </Row>
      </ListItem>
    )
  }
}

const styles = {
  listItemContainer: {
    lineHeight: '1',
    padding: '15px 0px 15px 15px'
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  thumbnailImage: {
    width: '100%'
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

export default CattleListItem;
