import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { assignItem } from '../../actions/bot_queue';

import '../../stylesheets/components/modal';

const msg = { level: ['уровень', 'уровня'], folder: ['папку', 'папки'] };
const modal_items = { level: 'levels', folder: 'folders' };

class AssignItemModal extends Component {

  constructor(props) {
    super(props);
    this.assign = this.assign.bind(this);
  }

  assign() {

    this.props.dispatch(
      assignItem(
        modal_items[this.props.currentModal],
        parseInt(this._value, 10),
        this.props.currentTask
      )
    );
  }

  getItemText() { }

  render() {
    const type = this.props.currentModal;
    if (type) {
      return (
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить {msg[type][0]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formControlsText">
                <ControlLabel>ID {msg[type][1]}</ControlLabel>
                <FormControl type="text" placeholder={'e.g. 863'}
                  onChange={e => (this._value = e.target.value)}
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
    else {
      return null;
    }
  }
}

AssignItemModal.propTypes = {
  currentModal: PropTypes.string,
  currentTask: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  const { currentModal, currentTask } = state;
  return { currentModal, currentTask };
};

export default connect(mapStateToProps)(AssignItemModal);
