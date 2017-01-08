import React from 'react';

export default class CustomPropTypes {

  static _cattleObject = {
    breed: React.PropTypes.string,
    check_digit: React.PropTypes.number,
    country_code: React.PropTypes.string,
    dob: React.PropTypes.string,
    gender: React.PropTypes.string,
    herdmark: React.PropTypes.string,
    id: React.PropTypes.number,
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    individual_number: React.PropTypes.number,
    name: React.PropTypes.string
  };

  static cattle = React.PropTypes.shape(CustomPropTypes._cattleObject);
}
