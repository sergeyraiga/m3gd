import React, { Component, PropTypes } from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewLevelModal from './NewLevelModal';
import { createLevel } from '../../actions/levels';
import { showNewLevelModal, closeNewLevelModal } from '../../actions/levels';

import '../../stylesheets/components/newLevelButton';

class NewLevelBtn extends Component {

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createLevel = this.createLevel.bind(this);
    this.tooltip = (
      <Tooltip id='new-level'>
        <strong>Новый уровень</strong>
      </Tooltip>
    );
  }

  showModal() {
    this.props.dispatch(showNewLevelModal());
  }

  closeModal() {
    this.props.dispatch(closeNewLevelModal());
  }

  createLevel(data) {
    this.props.dispatch(createLevel(data));
  }

  render() {
    return (
      <div className='new-level-btn'>
        <OverlayTrigger placement="bottom" overlay={this.tooltip} delay={500} delayHide={10}>
          <Glyphicon glyph='plus' style={{ cursor: 'pointer' }} onClick={this.showModal}/>
        </OverlayTrigger>
        <NewLevelModal
          show={this.props.newLevelModalShown}
          onHide={this.closeModal}
          createLevel={this.createLevel}
        />
    </div>
    );
  }
}

NewLevelBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newLevelModalShown: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { newLevelModalShown } = state;
  return { newLevelModalShown };
}

export default connect(mapStateToProps)(NewLevelBtn);
