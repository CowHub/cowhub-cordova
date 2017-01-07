import React from 'react';
import { connect } from 'react-redux';
import { Input, List, ListItem } from 'react-onsenui';
import CustomPropTypes from '../../utilities/CustomPropTypes'

class CattleDetail extends React.Component {
  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string,
    handleChange: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool
  };

  static defaultProps = {
    handleUpdate: () => { return },
    isEditing: true
  };

  renderImage() {
    return (
      <div style={ styles.image_container }>
        <img style={ styles.image }
          src={ this.props.image ? this.props.image : 'img/icon.png' }/>
      </div>
    );
  }

  renderInput(placeholder, type, value, key, minlength=0, maxlength=20) {
    return (
      <ListItem>
        <Input placeholder={ placeholder } type={ type }
          value={ type == 'tel' && value ? String(value) : value }
          onChange={ (e) => this.props.handleChange(key,
            type == 'tel' ? Number(e.target.value) : e.target.value) }
          style={ styles.input } minlength={ minlength } maxlength={ maxlength }
          {... (!this.props.isEditing ? { 'readOnly': true } : {}) }
        />
      </ListItem>
    );
  }

  renderCountryCode() {
    return this.renderInput('Country Code', 'text',
      this.props.cattle.country_code, 'country_code', 2, 2);
  }

  renderHerdmark() {
    return this.renderInput('Herdmark', 'text',
      this.props.cattle.herdmark, 'herdmark', 6, 6);
  }

  renderCheckDigit() {
    return this.renderInput('Check Digit', 'tel',
      this.props.cattle.check_digit, 'check_digit', 1, 1);
  }

  renderIdNumber() {
    return this.renderInput('Individual Number', 'tel',
      this.props.cattle.individual_number, 'individual_number', 1, 5);
  }

  render() {
    return (
      <List modifier='inset'>
        { this.renderImage() }
        { this.renderCountryCode() }
        { this.renderHerdmark() }
        { this.renderCheckDigit() }
        { this.renderIdNumber() }
      </List>
    )
  }
}

const styles = {
  input: {
    marginTop: '4px',
    width: '100%'
  },
  image_container: {
    backgroundColor: 'white',
    color: 'black',
    height: '250px',
    overflow: 'hidden'
  },
  image: {
    position: 'fixed',
    height: '100vw',
    margin: '0 auto',
    left: '0',
    right: '0',
  },
};

export default CattleDetail;
