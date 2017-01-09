import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { assignLevelId } from '../../actions/worlds';

import '../../stylesheets/components/modal';

class AssignLevelModal extends Component {

  constructor(props) {
    super(props);
    this.assign = this.assign.bind(this);
  }

  assign() {
    this.props.dispatch(
      assignLevelId(
        this._levelId,
        this.props.currentChapterLevel,
        this.props.currentChapter
      )
    );
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить уровень</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>ID уровня</ControlLabel>
              <FormControl type="text" placeholder={'e.g. 863'}
                onChange={e => (this._levelId = e.target.value)}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.assign()}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AssignLevelModal.propTypes = {
  currentChapter: PropTypes.object,
  currentChapterLevel: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  const { currentChapter, currentChapterLevel } = state;
  return { currentChapter, currentChapterLevel };
};

export default connect(mapStateToProps)(AssignLevelModal);
