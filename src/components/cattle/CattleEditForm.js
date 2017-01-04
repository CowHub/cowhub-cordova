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
    Fab,
    List,
    ListItem,
    ProgressCircular

} from 'react-onsenui';



class CattleEditForm extends React.Component {
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
    }).isRequired,
    updateFuncs: React.PropTypes.shape({
      updateHerdMark: React.PropTypes.func.isRequired,
      updateCountryCode: React.PropTypes.func.isRequired,
      updateCheckDigit: React.PropTypes.func.isRequired,
      updateIdNumber: React.PropTypes.func.isRequired,
    })
  };

  render() {
    return (
          <List modifier="inset">

            <ListItem>
              <Input type="tel" placeholder="Herdmark" minlength="6" maxlength="6" value={this.props.cattle.herdmark}
                     onChange={(event) => this.props.updateFuncs.updateHerdMark(event.target.value)} style={styles.textInput}/>
            </ListItem>
            <ListItem>
              <Input type="text" placeholder="Country Code" value={this.props.cattle.country_code}
                     onChange={(event) => this.props.updateFuncs.updateCountryCode(event.target.value)}
                     style={styles.textInput}/>
            </ListItem>
            <ListItem>
              <Input type="tel" placeholder="Check Digit" min="0" max="7" maxlength="1"
                     onChange={(event) => this.props.updateFuncs.updateCheckDigit(event.target.value)}
                     value={this.props.cattle.check_digit}
                     style={styles.textInput}/>
            </ListItem>
            <ListItem>
              <Input type="tel" placeholder="Individual Number" value={this.props.cattle.individual_number}
                     onChange={(event) => this.props.updateFuncs.updateIdNumber(event.target.value)}
                     style={styles.textInput}/>
            </ListItem>
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
