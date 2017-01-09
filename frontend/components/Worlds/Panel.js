// Worlds

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewBtn from './NewBtn';

class Panel extends Component {
  render() {
    return (
      <div className='page-tools'>
        <div className='media-body'>
          <div className='level-configs-count'>
            <span className='level-configs-panel-icon glyphicon glyphicon-record'/>
            <div className='level-configs-panel-value'>
              Всего: {this.props.visibleWorlds.length}
            </div>
          </div>
          <NewBtn/>
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  currentWorld: PropTypes.object.isRequired,
  visibleWorlds: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { visibleWorlds, currentWorld } = state;
  return { visibleWorlds, currentWorld };
}

export default connect(mapStateToProps)(Panel);
