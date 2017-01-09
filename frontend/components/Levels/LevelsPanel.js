import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewLevelBtn from './NewLevelBtn';
import ImportLevelBtn from './ImportLevelBtn';

class LevelsPanel extends Component {
  render() {
    return (
      <div className='page-tools'>
        <div className='media-body'>
          <div className='level-configs-count'>
            <span className='level-configs-panel-icon glyphicon glyphicon-record'/>
            <div className='level-configs-panel-value'>
              Всего: {this.props.visibleLevels.length}
            </div>
          </div>
          <NewLevelBtn/>
          <ImportLevelBtn/>
        </div>
      </div>
    );
  }
}

LevelsPanel.propTypes = {
  visibleLevels: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { visibleLevels } = state;
  return { visibleLevels };
}

export default connect(mapStateToProps)(LevelsPanel);
