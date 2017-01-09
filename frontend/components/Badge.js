import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import '../stylesheets/components/badge';

class Badge extends Component {
  render() {
    const classes = {};
    classes[this.props.type] = true;
    classes.label = true;
    return (
      <span className={classNames(classes)}>
        {this.props.desc}
      </span>
    );
  }
}

Badge.propTypes = {
  desc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number
};

export default Badge;
