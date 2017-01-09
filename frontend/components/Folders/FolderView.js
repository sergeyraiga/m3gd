import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import Configs from '../Configs';
import { getFolderLevels, closeFolder } from '../../actions/folders';

class FolderView extends Component {

  componentDidMount() {
    this.props.dispatch(getFolderLevels(this.props.currentFolder.id));
  }

  render() {
    return (
      <div>
        <div className='folder-view-panel' onClick={() => this.props.dispatch(closeFolder())}>
          <div className='folder-view-panel-table-row'>
            <Glyphicon glyph='chevron-left'
              style={{ fontSize: '16px', color: '#555', display: 'table-cell' }}
            />
            <div className='folder-name'>
              {this.props.currentFolder.name}
            </div>
          </div>
        </div>
        {!this.props.application.spinner ?
          <Configs style={{ top: '188px' }}/> : null
        }
      </div>
    );
  }
}

FolderView.propTypes = {
  application: PropTypes.object,
  currentFolder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { application, currentFolder } = state;
  return { application, currentFolder };
}

export default connect(mapStateToProps)(FolderView);
