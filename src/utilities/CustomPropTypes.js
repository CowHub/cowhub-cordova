import React from 'react';

export default class CustomPropTypes {

  static _cattleObject = {
    breed: React.PropTypes.string,
    check_digit: React.PropTypes.number,
    country_code: React.PropTypes.string,
    dob: React.PropTypes.string,
    gender: React.PropTypes.string,
    genetic_dam: React.PropTypes.string,
    herdmark: React.PropTypes.string,
    id: React.PropTypes.number,
    image_ids: React.PropTypes.arrayOf(React.PropTypes.number),
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    individual_number: React.PropTypes.number,
    location: CustomPropTypes.location,
    name: React.PropTypes.string,
    sir_dam: React.PropTypes.string,
    surrogate_dam: React.PropTypes.string,
  };

  static cattle = React.PropTypes.shape(CustomPropTypes._cattleObject);

  static _location = {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number
  };

  static location = React.PropTypes.shape(CustomPropTypes._location);
}
