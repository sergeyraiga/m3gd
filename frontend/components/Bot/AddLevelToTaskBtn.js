import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { openAssignItemModal, setCurrentTask } from '../../actions/bot_queue';

class AddLevelToTaskBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    this.props.dispatch(setCurrentTask(this.props.task.id));
    this.props.dispatch(openAssignItemModal('level'));
  }

  render() {
    return (
      <div>
        <Button className='add-bot-task-item-btn' onClick={this.onClickAction}>
          <Glyphicon glyph='plus' className='bot-item-glyph'/>
          Уровень
        </Button>
      </div>
    );
  }
}

AddLevelToTaskBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object,
  task: PropTypes.object
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddLevelToTaskBtn);
