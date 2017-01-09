import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Splash from '../Base/Splash';
import FoldersList from './FoldersList';
import FoldersPanel from './FoldersPanel';
import FolderView from './FolderView';
import FilterPanel from './FilterPanel';
import { getFolders } from '../../actions/folders';

class Folders extends Component {

  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  render() {
    return (
      <div className='container-fluid'>
        <FilterPanel
          dispatch={this.props.dispatch}
          currentFolder={this.props.currentFolder}
          username={this.props.username}
        />
        <FoldersPanel/>
        {this.props.visibleFolders.length ?
          this.props.currentFolder.name ?
          <FolderView/> : <FoldersList/>
          : <Splash style={{ paddingTop: '15px' }}>Список папок<br/>пуст</Splash>}
      </div>
    );
  }
}

Folders.propTypes = {
  currentFolder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string,
  visibleFolders: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { visibleFolders, currentFolder, application } = state;
  const { username } = application;
  return { visibleFolders, currentFolder, username };
}

export default connect(mapStateToProps)(Folders);
