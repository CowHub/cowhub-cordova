import React from 'react';
import {connect} from 'react-redux';
import {Input, List, ListItem} from 'react-onsenui';
import CustomPropTypes from '../../utilities/CustomPropTypes'

class CattleDetail extends React.Component {
  static propTypes = {
    cattle: CustomPropTypes.cattle,
    image: React.PropTypes.string,
    handleChange: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool
  };

  static defaultProps = {
    handleUpdate: () => {
      return
    },
    isEditing: true
  };

  renderImage() {
    return (
      <img style={ styles.image }
           src={ this.props.image ? this.props.image : 'img/icon.png' }/>
    );
  }

  renderTextInput(value, placeholder, key, minlength = 0, maxlength = 20) {
    if (this.props.isEditing || value)
      return (
        <ListItem style={ styles.input_wrapper }>
          <Input float placeholder={ placeholder } type='text' value={ value }
                 onChange={ (e) => this.props.handleChange(key, e.target.value) }
                 style={ styles.input } minlength={ minlength } maxlength={ maxlength }
            {... (!this.props.isEditing ? {'readOnly': true} : {}) }
          />
        </ListItem>
      );
  }

  renderNumberInput(value, placeholder, key, minlength = 0, maxlength = 20) {
    if (this.props.isEditing || value)
      return (
        <ListItem style={ styles.input_wrapper }>
          <Input float placeholder={ placeholder } type='tel'
                 value={ value ? String(value) : value }
                 onChange={ (e) => this.props.handleChange(key, Number(e.target.value)) }
                 style={ styles.input } minlength={ minlength } maxlength={ maxlength }
            {... (!this.props.isEditing ? {'readOnly': true} : {}) }
          />
        </ListItem>
      );
  }

  renderDateInput(value, placeholder, key, before = new Date()) {
    if (this.props.isEditing || value)
      return (
        <ListItem style={ styles.input_wrapper }>
          <Input float placeholder={ placeholder } type='date' value={ value }
                 onChange={ (e) => this.props.handleChange(key, e.target.value) }
                 style={ styles.input } max={ before }
            {... (!this.props.isEditing ? {'readOnly': true, 'value':} : {}) }
          />
        </ListItem>
      );
  }

  renderSelectInput(value, placeholder, key, options, values) {
    if (!values)
      values = options;
    if (this.props.isEditing || value) {
      if (this.props.isEditing) {
        return (
          <ListItem style={ styles.input_wrapper }>
            <select style={styles.drop_down} onChange={(e) => this.props.handleChange(key, e.target.value)}>
              <option value="">{placeholder}</option>
              { options.map((option, i) => {
                return <option value={ values[i] } key={ i }>{ option }</option>
              })}
            </select>


          </ListItem>
        )
      } else if (value){
        return (
          <ListItem style={ styles.input_wrapper }>
            <Input float placeholder={ placeholder } type='text' value={ value }
                   style={ styles.input } readOnly={true}
            />
          </ListItem>
        );
      }
    }
  }


  renderCountryCode() {
    return this.renderTextInput(this.props.cattle.country_code,
      'Country Code', 'country_code', 2, 2);
  }

  renderHerdmark() {
    return this.renderNumberInput(this.props.cattle.herdmark,
      'Herdmark', 'herdmark', 6, 6);
  }

  renderCheckDigit() {
    return this.renderNumberInput(this.props.cattle.check_digit,
      'Check Digit', 'check_digit', 1, 1);
  }

  renderIdNumber() {
    return this.renderNumberInput(this.props.cattle.individual_number,
      'Individual Number', 'individual_number', 1, 5);
  }

  renderBreed() {
    return this.renderSelectInput(this.props.cattle.breed, 'Breed', 'breed',
      breeds, breed_codes);
  }

  renderDOB() {
    return this.renderDateInput(this.props.cattle.dob, 'Date of Birth', 'dob');
  }

  renderGender() {
    return this.renderSelectInput(this.props.cattle.gender, 'Gender', 'gender',
      gender);
  }

  renderGeneticDam() {
    return this.renderTextInput(this.props.cattle.genetic_dam, 'Genetic Dam',
      'genetic_dam', 14, 14);
  }

  renderSurrogateDam() {
    return this.renderTextInput(this.props.cattle.surrogate_dam, 'Surrogate Dam',
      'surrogate_dam', 14, 14);
  }

  renderSirDam() {
    return this.renderTextInput(this.props.cattle.sir_dam, 'Sir Dam',
      'sir_dam', 14, 14);
  }

  render() {
    return (
      <List modifier='inset' style={ styles.detail_wrapper}>
        { this.renderImage() }
        { this.renderCountryCode() }
        { this.renderHerdmark() }
        { this.renderCheckDigit() }
        { this.renderIdNumber() }
        { this.renderBreed() }
        { this.renderDOB() }
        { this.renderGender() }
        { this.renderGeneticDam() }
        { this.renderSurrogateDam() }
        { this.renderSirDam() }
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
  drop_down: {
    border: 'none',
    backgroundColor: 'transparent',
    padding: '3px 5px',
    width: '100%',
    fontSize: '15px',
    height: '31px',

  }
};

const gender = ['male', 'female'];

const breeds = [
  'Aberdeen Angus', 'Abondance', 'Australian Lowline', 'Angler Rotvieh', 'Ankole',
  'Armoricaine', 'Aubrac', 'Ayrshire', 'Baltata Romaneasca', 'Bazadaise', 'Beefalo',
  'Beef Shorthorn', 'Belted Dutch', 'Belted Galloway', 'Belted Welsh Black', 'Bison',
  'Blonde D’Aquitaine', 'Blue Albion', 'Blue Grey', 'Brahman', 'Bretonne Pie-Noire',
  'British Blue', 'British Friesian', 'British White', 'Brown Swiss', 'Charolais',
  'Chianina', 'Chillingham', 'Coloured Welsh', 'Danish Red', 'Dairy Shorthorn',
  'Devon', 'Dexter', 'Dwarf Zebu', 'East Finnish Brown', 'English Park', 'Estonian Red',
  'Flekvieh', 'Frisona Espagnola', 'Gasconne', 'Galloway', 'Gayal', 'Gelbvieh',
  'Gloucester', 'Groninger Blaarkop', 'Guernsey', 'Heck', 'Hereford', 'Highland',
  'Holstein', 'Holstein Friesian', 'Hungarian Steppe', 'Irish Moiled', 'Jersey',
  'Kerry', 'Kiwi', 'Lakenvelder', 'Limousin', 'Lincoln Red', 'Longhorn', 'Luing',
  'Maine Anjou', 'Malkekorthorn', 'Marchigiana', 'Meuse Rhine Issel', 'Montbeliarde',
  'Murray Grey', 'Normande', 'Northern Dairy Shorthorn', 'Norwegian Red', 'Old English',
  'Other Dairy', 'Parthenais', 'Piemontese', 'Pinzgauer', 'Red Poll', 'Reggiana',
  'Riggit Galloway', 'Romagnola', 'Rotebunde', 'Salers', 'Shetland', 'Shorthorn',
  'Simmental', 'South Devon', 'Speckle Park', 'Stabiliser', 'Swedish Red', 'Swedish Red Polled',
  'Swedish Red and White', 'Swiss Braunvieh', 'Swiss Orig Braunvieh', 'Swiss Grey',
  'Sussex', 'Tyrone Black', 'Tarantaise-Tarina', 'Valdostana Nera', 'Vaynol', 'Wagyu',
  'Water Buffalo', 'Welsh Black', 'Welsh White', 'White Galloway', 'Whitebred Shorthorn',
  'White Park', 'Yak', 'Zebu'
];

const breed_codes = [
  'AA', 'AB', 'ALL', 'AR', 'AN', 'AM', 'AU', 'AY', 'BRO', 'BAZ', 'BEL', 'BSH', 'BD',
  'BG', 'BWB', 'BI', 'BA', 'BAL', 'BL', 'G', 'BR', 'BP', 'BRB', 'BF', 'BW', 'BS',
  'CH', 'CHI', 'CHL', 'CW', 'DR', 'DS', 'DEV', 'DEX', 'DZE', 'EFB', 'EP', 'ER',
  'FKV', 'FE', 'GAS', 'GA', 'GAY', 'GE', 'GL', 'GB', 'GU', 'HK', 'HE', 'HI', 'HO',
  'HF', 'HS', 'IM', 'JE', 'KE', 'KI', 'WI', 'LV', 'LIM', 'LR', 'LH', 'LU', 'MA',
  'MAL', 'MAR', 'MRI', 'MO', 'MG', 'NO', 'NDS', 'NR', 'OE', 'OD', 'PA', 'PI', 'PIN',
  'RP', 'RE', 'RG', 'RO', 'ROT', 'SA', 'SH', 'SHO', 'SM', 'SD', 'SP', 'ST', 'SR',
  'SRP', 'SRW', 'SB', 'SOB', 'SG', 'SU', 'TB', 'TT', 'VN', 'VA', 'WA', 'BU', 'WB',
  'WW', 'WG', 'WS', 'WP', 'YK', 'ZE'
];

export default CattleDetail;
