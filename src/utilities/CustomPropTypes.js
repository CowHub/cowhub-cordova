import React from 'react';

export default class CustomPropTypes {

  static _cattleObject = {
    breed: React.PropTypes.string,
    check_digit: React.PropTypes.number.isRequired,
    country_code: React.PropTypes.string.isRequired,
    dob: React.PropTypes.string,
    gender: React.PropTypes.string,
    herdmark: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    individual_number: React.PropTypes.number.isRequired,
    name: React.PropTypes.string
  };

  static cattle = React.PropTypes.shape(CustomPropTypes._cattleObject);
}
