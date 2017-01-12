import React from 'react';

import { ProgressCircular } from 'react-onsenui';

class ProgressSpinner extends React.Component {

  static propTypes = {
    message: React.PropTypes.string,
    shouldDisplay: React.PropTypes.bool
  };

  render() {
    if (!this.props.shouldDisplay)
      return <div></div>

    return (
      <div style={ styles.loadingWrapper }>
        <div style={ styles.loadingBox }>
          <ProgressCircular indeterminate />
          <div style={ styles.loadingMessage }>{ this.props.message }</div>
        </div>
      </div>
    );
  }
}

const styles = {
  loadingWrapper: {
    position: 'fixed',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.25',
    width: '100vw',
    height: '100vh'
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(249, 249, 249)',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    padding: '10%'
  },
  loadingMessage: {
    marginTop: '20px'
  }
};

export default ProgressSpinner;
