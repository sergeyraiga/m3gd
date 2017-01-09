import React, { Component, PropTypes } from 'react';
import AddChapterBtn from './Worlds/AddChapterBtn';
import SaveWorldBtn from './Worlds/SaveWorldBtn';
import AssignLevelModal from './Worlds/AssignLevelModal';
import Chapter from './Worlds/Chapter';
import { connect } from 'react-redux';
import { closeAssignLevelModal } from '../actions/worlds';

import '../stylesheets/components/splash';
import '../stylesheets/components/worldEditor';

class WorldEditor extends Component {

  render() {
    return (
      <div className='world-editor'>
        <div className='splash-content'>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '24px' }}>
              {this.props.currentWorld.name}
              <div className='save-world-btn-container'>
                <SaveWorldBtn/>
              </div>
            </div>
          </div>
          <div className='chapters-container'>
            {this.props.chapters.map((chapter, index) =>
              <Chapter chapter={chapter} index={index} key={index}/>
            )}
            <AddChapterBtn/>
          </div>
        </div>
        <AssignLevelModal show={this.props.assignLevelModalShown}
          onHide={() => this.props.dispatch(closeAssignLevelModal())}
        />
      </div>
    );
  }
}

WorldEditor.propTypes = {
  assignLevelModalShown: PropTypes.bool.isRequired,
  chapters: PropTypes.array,
  currentWorld: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

function mapStateToProps(state) {
  const { chapters, currentWorld, assignLevelModalShown } = state;
  return { chapters, currentWorld, assignLevelModalShown };
}

export default connect(mapStateToProps)(WorldEditor);
