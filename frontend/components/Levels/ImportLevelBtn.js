import React, { Component, PropTypes } from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import ImportLevelModal from './ImportLevelModal';
import { showImportLevelModal, closeImportLevelModal } from '../../actions/levels';

import '../../stylesheets/components/newLevelButton';

class ImportLevelBtn extends Component {

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openFile = this.openFile.bind(this);
    this.tooltip = (
      <Tooltip id='new-level'>
        <strong>Импортировать уровень</strong>
      </Tooltip>
    );
  }

  showModal() {
    this.props.dispatch(showImportLevelModal());
  }

  closeModal() {
    this.props.dispatch(closeImportLevelModal());
  }

  openFile(e) {
    console.log(e);
  }

  render() {
    return (
      <div className='new-level-btn'>
        <OverlayTrigger placement="bottom" overlay={this.tooltip} delay={500} delayHide={10}>
          <Glyphicon glyph='open' style={{ cursor: 'pointer' }} onClick={this.showModal}/>
        </OverlayTrigger>
        <ImportLevelModal
          show={this.props.importLevelModalShown}
          onHide={this.closeModal}
        />
    </div>
    );
  }
}

ImportLevelBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  importLevelModalShown: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { importLevelModalShown } = state;
  return { importLevelModalShown };
}

export default connect(mapStateToProps)(ImportLevelBtn);