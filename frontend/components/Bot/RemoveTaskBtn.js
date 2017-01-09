import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { removeTask } from '../../actions/bot_queue';

class RemoveTaskBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    const props = this.props;
    props.dispatch(removeTask(this.props.task));
  }

  render() {
    return (
      <div className='delete-chapter-level-btn' onClick={this.onClickAction}>
        <Glyphicon glyph='remove' className='delete-glyph'/>
      </div>
    );
  }
}

RemoveTaskBtn.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = state => {
  const { tasks } = state;
  return { tasks };
};

export default connect(mapStateToProps)(RemoveTaskBtn);
