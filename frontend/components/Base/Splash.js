import React, { Component, PropTypes } from 'react';

import '../../stylesheets/components/splash';

export default class Splash extends Component {

  render() {
    return (
      <div className='splash' style={this.props.style}>
        <div className='splash-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Splash.propTypes = {
  children: PropTypes.array,
  style: PropTypes.object
};
