import React from 'react';

import { ToolbarButton, Icon, Popover, List, ListItem } from 'react-onsenui';

class HamburgerButton extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    options: React.PropTypes.array,
  };

  static defaultProps = {
    className: 'right',
    options: []
  };

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  renderHamburger() {
    return (
      <ToolbarButton ref='optionsMenu'>
        <Icon icon='md-more-vert'
          onClick={ () => this.setState({ expanded: true })}/>
      </ToolbarButton>
    );
  }

  renderOptions() {
    return (
      <Popover
        isOpen={ this.state.expanded }
        onCancel={ () => this.setState({ expanded: false })}
        isCancelable={ true }
        getTarget={ () => { return this.refs.optionsMenu; }}
      >
        <List>
          { this.props.options.map((option) => {
            return this.renderOption(option);
          })}
        </List>
      </Popover>
    );
  }

  renderOption(option) {
    return (
      <ListItem key={ option.title } modifier='tappable'
        onClick={ () => {
          option.onClick();
          this.setState({ expanded: false });
        }}
      >
        <Icon icon={ option.icon }/>
        <div className='right'>{ option.title }</div>
      </ListItem>
    );
  }

  render() {
    return (
      <div className={ this.props.className }>
        { this.renderHamburger() }
        { this.renderOptions() }
      </div>
    );
  }
}

export default HamburgerButton;
