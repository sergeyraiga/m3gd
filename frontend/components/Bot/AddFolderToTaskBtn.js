import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { openAssignItemModal } from '../../actions/bot_queue';

class AddLevelToTaskBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    this.props.dispatch(openAssignItemModal('folder'));
  }

  render() {
    return (
      <div>
        <Button className='add-bot-task-item-btn' onClick={this.onClickAction}>
          <Glyphicon glyph='plus' className='bot-item-glyph'/>
          Папку
        </Button>
      </div>
    );
  }
}

AddLevelToTaskBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddLevelToTaskBtn);
