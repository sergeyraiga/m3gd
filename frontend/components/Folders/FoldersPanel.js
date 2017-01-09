import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewFolderBtn from './NewFolderBtn';

class FoldersPanel extends Component {
  render() {
    return (
      <div className='page-tools'>
        <div className='media-body'>
          <div className='level-configs-count'>
            <span className='level-configs-panel-icon glyphicon glyphicon-record'/>
            <div className='level-configs-panel-value'>
              Всего: {this.props.currentFolder.id ?
                this.props.visibleLevels.length
                : this.props.visibleFolders.length
              }
            </div>
          </div>
          <NewFolderBtn/>
        </div>
      </div>
    );
  }
}

FoldersPanel.propTypes = {
  currentFolder: PropTypes.object.isRequired,
  visibleFolders: PropTypes.array.isRequired,
  visibleLevels: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { visibleFolders, visibleLevels, currentFolder } = state;
  return { visibleFolders, visibleLevels, currentFolder };
}

export default connect(mapStateToProps)(FoldersPanel);
