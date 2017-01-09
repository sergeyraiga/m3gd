import React, { Component, PropTypes } from 'react';
import AddLevelToTaskBtn from './AddLevelToTaskBtn';
import AddFolderToTaskBtn from './AddFolderToTaskBtn';
import RemoveTaskBtn from './RemoveTaskBtn';
import { connect } from 'react-redux';

class RunBotTask extends Component {

  render() {
    return (
      <div className='chapter-levels-container'>
        <RemoveTaskBtn task={this.props.task}/>
        <div style={{ fontSize: '22px', marginBottom: '10px' }}>
          Задача {this.props.index + 1}
            {this.props.task.properties ?
              <div style={{ marginTop: '10px' }}>
                {this.props.task.levels.length ?
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '18px' }}>Уровни:</div>
                    {this.props.task.levels.map(level =>
                      <div style={{ fontSize: '16px' }}>{level}</div>
                    )}
                  </div>
                  : null
                }
                {this.props.task.folders.length ?
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '18px' }}>Папки:</div>
                    {this.props.task.folders.map(folder =>
                      <div style={{ fontSize: '16px' }}>{folder}</div>
                    )}
                  </div>
                  : null
                }
              </div>
              : null
            }
        </div>
        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
          <AddLevelToTaskBtn task={this.props.task}/>
          <AddFolderToTaskBtn task={this.props.task}/>
        </div>
      </div>
    );
  }
}

RunBotTask.propTypes = {
  index: PropTypes.number,
  task: PropTypes.object
};

export const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RunBotTask);
