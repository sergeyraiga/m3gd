import React, { Component, PropTypes } from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewModal from './NewModal';
import { showNewModal, closeNewModal, createWorld } from '../../actions/worlds';

import '../../stylesheets/components/newLevelButton';

class NewFolderBtn extends Component {

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createWorld = this.createWorld.bind(this);
    this.tooltip = (
      <Tooltip id='new-world'>
        <strong>Новый мир</strong>
      </Tooltip>
    );
  }

  showModal() {
    this.props.dispatch(showNewModal());
  }

  closeModal() {
    this.props.dispatch(closeNewModal());
  }

  createWorld(data) {
    this.props.dispatch(createWorld(data));
  }

  render() {
    return (
      <div className='new-level-btn'>
        <OverlayTrigger placement="bottom" overlay={this.tooltip} delay={500} delayHide={10}>
          <Glyphicon
            glyph='plus' style={{ cursor: 'pointer' }} onClick={this.showModal}
          />
        </OverlayTrigger>
        <NewModal
          show={this.props.newWorldModalShown}
          onHide={this.closeModal}
          createWorld={this.createWorld}
        />
    </div>
    );
  }
}

NewFolderBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newWorldModalShown: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { newWorldModalShown } = state;
  return { newWorldModalShown };
}

export default connect(mapStateToProps)(NewFolderBtn);
