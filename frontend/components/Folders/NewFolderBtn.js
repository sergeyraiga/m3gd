import React, { Component, PropTypes } from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import NewFolderModal from './NewFolderModal';
import { showNewFolderModal, closeNewFolderModal, createFolder } from '../../actions/folders';

import '../../stylesheets/components/newLevelButton';

class NewFolderBtn extends Component {

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.tooltip = (
      <Tooltip id='new-level'>
        <strong>Новая папка</strong>
      </Tooltip>
    );
  }

  showModal() {
    this.props.dispatch(showNewFolderModal());
  }

  closeModal() {
    this.props.dispatch(closeNewFolderModal());
  }

  createFolder(data) {
    this.props.dispatch(createFolder(data));
  }

  render() {
    return (
      <div className='new-level-btn'>
        <OverlayTrigger placement="bottom" overlay={this.tooltip} delay={500} delayHide={10}>
          <Glyphicon
            glyph='plus' style={{ cursor: 'pointer' }} onClick={this.showModal}
          />
        </OverlayTrigger>
        <NewFolderModal
          show={this.props.newFolderModalShown}
          onHide={this.closeModal}
          createFolder={this.createFolder}
        />
    </div>
    );
  }
}

NewFolderBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newFolderModalShown: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { newFolderModalShown } = state;
  return { newFolderModalShown };
}

export default connect(mapStateToProps)(NewFolderBtn);
