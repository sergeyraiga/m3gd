import React, { Component, PropTypes } from 'react';
import Tab from './Tab';

import '../stylesheets/components/tabs';

class Tabs extends Component {
  render() {
    const params = this.props.params;
    const tabs = params.tabs;
    return (
      <div className='tabs'>
        <ul className='nav nav-tabs'>
          {Object.keys(tabs).map(
            type => {
              return (
                <Tab
                  name={tabs[type].name} type={type} key={type}
                  active={params.currentTab} dispatch={params.dispatch}
                />
              );}, this)
            }
        </ul>
      </div>
    );
  }
}

Tabs.propTypes = {
  params: PropTypes.object.isRequired
};

export default Tabs;
