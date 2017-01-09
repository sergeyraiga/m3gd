import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { addTask } from '../../actions/bot_queue';

class AddTaskBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    this.props.dispatch(addTask());
  }

  render() {
    return (
      <div>
        <Button className='add-chapter-btn' onClick={this.onClickAction}>
          Добавить задачу
        </Button>
      </div>
    );
  }
}

AddTaskBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddTaskBtn);
