import React from 'react';
import { connect } from 'react-redux';
import { Input, List, ListItem } from 'react-onsenui';
import CustomPropTypes from '../../utilities/CustomPropTypes'

class CattleDetail extends React.Component {
  static propTypes = {
    cattle: CustomPropTypes.cattle,
    handleChange: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool
  };

  static defaultProps = {
    handleUpdate: () => { return },
    isEditing: true
  };

  renderInput(placeholder, type, value, key, minlength=0, maxlength=20) {
    return (
      <ListItem>
        <Input placeholder={ placeholder } type={ type } value={ value }
          onChange={ (e) => this.props.handleUpdate(key, e.target.value) }
          style={ styles.input } minlength={ minlength } maxlength={ maxlength }
          {... (!this.props.isEditing ? { 'readOnly': true } : {}) }
        />
      </ListItem>
    );
  }

  renderCountryCode() {
    return this.renderInput("Country Code", "text",
      this.props.cattle.country_code, 'country_code', 2, 2);
  }

  renderHerdmark() {
    return this.renderInput("Herdmark", "tel",
      this.props.cattle.herdmark, 'herdmark', 6, 6);
  }

  renderCheckDigit() {
    return this.renderInput("Check Digit", "tel",
      this.props.cattle.check_digit, 'check_digit', 1, 1);
  }

  renderIdNumber() {
    return this.renderInput("Individual Number", "tel",
      this.props.cattle.individual_number, 'individual_number', 1, 5);
  }

  render() {
    return (
      <List modifier="inset">
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
  }
};

export default CattleDetail;
