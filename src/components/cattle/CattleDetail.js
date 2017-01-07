import React from 'react';
import {
    Input,
    List,
    ListItem
} from 'react-onsenui';
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
      <img style={ styles.image }
        src={ this.props.image ? this.props.image : 'img/icon.png' }/>
    );
  }

  renderInput(placeholder, type, value, key, minlength=0, maxlength=20) {
    return (
      <ListItem style={ styles.input_wrapper }>
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
      <List modifier='inset' style={ styles.detail_wrapper}>
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
  detail_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0',
    marginTop: '2.5vw',
    marginBottom: '10vh'
  },
  image: {
    maxHeight: '85vw',
    maxWidth: '85vw',
    marginBottom: '7.5vw'
  },
  input: {
    width: '100%'
  },
  input_wrapper: {
    width: '85%',
    margin: '0',
    padding: '0'
  },
};

export default CattleDetail;
