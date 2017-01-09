import classNames from 'classnames';
import { connect } from 'react-redux';
import { switchLeftPanelTab } from '../actions';
import React, { Component, PropTypes } from 'react';

import '../stylesheets/components/tabs';

class Tab extends Component {
  render() {
    const classes = {};
    classes[this.props.type] = true;
    classes.active = this.props.active === this.props.type;
    const typeIndex = this.props.type;
    const type = this.props.type;
    return (
      <li role='presentation' className={classNames(classes)}
        onClick={() => this.props.dispatch(switchLeftPanelTab(typeIndex, { type }))}>
        <a href='#' className='tab-name'>{this.props.name}</a>
      </li>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  tabs: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const { tabs } = state;
  return { tabs };
}

export default connect(mapStateToProps)(Tab);
