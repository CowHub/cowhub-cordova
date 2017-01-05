import React from 'react';
import { connect } from 'react-redux';
import { Input, List, ListItem } from 'react-onsenui';

class CattleEditForm extends React.Component {
  static propTypes = {
    cattle: React.PropTypes.shape({
      breed: React.PropTypes.string,
      check_digit: React.PropTypes.number.isRequired,
      country_code: React.PropTypes.string.isRequired,
      dob: React.PropTypes.string,
      gender: React.PropTypes.string,
      herdmark: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
      individual_number: React.PropTypes.number.isRequired,
      name: React.PropTypes.string,
      images: React.PropTypes.arrayOf(React.PropTypes.string),
    }).isRequired,
    updateFuncs: React.PropTypes.shape({
      updateHerdMark: React.PropTypes.func.isRequired,
      updateCountryCode: React.PropTypes.func.isRequired,
      updateCheckDigit: React.PropTypes.func.isRequired,
      updateIdNumber: React.PropTypes.func.isRequired,
    }),
    isEditing: React.PropTypes.bool
  };

  static defaultProps = {
    updateFuncs: {
      updateHerdMark: () => { return },
      updateCountryCode: () => { return },
      updateCheckDigit: () => { return },
      updateIdNumber: () => { return },
    },
    isEditing: true
  };

  renderCountryCode() {
    return (
      <ListItem>
        <Input placeholder="Country Code"
          type="text"
          value={ this.props.cattle.country_code }
          onChange={ (event) => this.props.updateFuncs.updateCountryCode(event.target.value) }
          style={ styles.textInput } minlength="2" maxlength="2"
          {... (!this.props.isEditing ? { 'readOnly': true } : {}) }
        />
      </ListItem>
    );
  }

  renderHerdmark() {
    return (
      <ListItem>
        <Input placeholder="Herdmark"
          type="tel"
          value={ this.props.cattle.herdmark }
          onChange={ (event) => this.props.updateFuncs.updateHerdMark(event.target.value) }
          style={ styles.textInput } minlength="6" maxlength="6"
          {... (!this.props.isEditing ? { 'readOnly': true } : {}) }
        />
      </ListItem>
    );
  }

  renderCheckDigit() {
    return (
      <ListItem>
        <Input placeholder="Check Digit"
          type="tel"
          value={ this.props.cattle.check_digit }
          onChange={ (event) => this.props.updateFuncs.updateCheckDigit(event.target.value) }
          style={ styles.textInput } min="0" max="7" maxlength="1"
          {... (!this.props.isEditing ? { 'readOnly': true } : {}) }
        />
      </ListItem>
    );
  }

  renderIdNumber() {
    return (
      <ListItem>
        <Input placeholder="Individual Number"
          type="tel"
          value={ this.props.cattle.individual_number }
          onChange={ (event) => this.props.updateFuncs.updateIdNumber(event.target.value) }
          style={ styles.textInput } maxlength="5"
          {... (!this.props.isEditing ? { 'readOnly': true } : {}) }
        />
      </ListItem>
    );
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
  textInput: {
    marginTop: '4px',
    width: '100%'
  },
  formInput: {
    fontWeight: '500',
    fontSize: '17px',
    marginBottom: '4px'
  }
};

export default CattleEditForm;
