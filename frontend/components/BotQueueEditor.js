import React, { Component, PropTypes } from 'react';
import AddFolderToTaskBtn from './Bot/AddFolderToTaskBtn';
import AddLevelToTaskBtn from './Bot/AddLevelToTaskBtn';
import RunBotQueueBtn from './Bot/RunBotQueueBtn';
import AssignItemModal from './Bot/AssignItemModal';
import RunBotTask from './Bot/RunBotTask';
import AddTaskBtn from './Bot/AddTaskBtn';
import { connect } from 'react-redux';
import { closeAssignItemModal } from '../actions/bot_queue';

import '../stylesheets/components/splash';
import '../stylesheets/components/worldEditor';
import '../stylesheets/components/botQueue';

class BotQueueEditor extends Component {

  render() {
    return (
      <div className='world-editor'>
        <div className='splash-content'>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '24px' }}>
              <div>
                Очередь запуска бота
              </div>
              <div className='save-world-btn-container'>
                <RunBotQueueBtn/>
              </div>
            </div>
          </div>
          <div className=''>
            {this.props.botQueue.map((task, index) =>
              <RunBotTask task={task} index={index} key={index}/>
            )}
          </div>
          <div>
            <AddTaskBtn/>
            <br/>
          </div>
        </div>
        <AssignItemModal show={this.props.assignItemModalShown}
          onHide={() => this.props.dispatch(closeAssignItemModal())}
        />
      </div>
    );
  }
}

BotQueueEditor.propTypes = {
  assignItemModalShown: PropTypes.bool.isRequired,
  botQueue: PropTypes.array,
  currentWorld: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

function mapStateToProps(state) {
  const { botQueue, assignItemModalShown } = state;
  return { botQueue, assignItemModalShown };
}

export default connect(mapStateToProps)(BotQueueEditor);
