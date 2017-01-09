import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class NewLevelModal extends Component {

  constructor(props) {
    super(props);
    this.submitLevel = this.submitLevel.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  submitLevel() {
    const data = {};
    const nameInputValue = this._levelName;
    if (nameInputValue !== '') {
      data.name = nameInputValue;
      data.level = '{}';
      data.description = this._levelDesc;
    }
    else {
      this.errorMessage(this._name, 'Имя не может быть пустым');
      return 1;
    }
    this.props.createLevel(data);
    return 0;
  }

  errorMessage(element, message) {
    console.error(message);
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Создание нового уровня</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Название</ControlLabel>
              <FormControl
                type="text"
                onChange={e => (this._levelName = e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Описание</ControlLabel>
              <FormControl
                type="text"
                onChange={e => (this._levelDesc = e.target.value)}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.submitLevel()}>Создать</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewLevelModal.propTypes = {
  createLevel: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  username: PropTypes.string
};

function mapStateToProps(state) {
  const { application } = state;
  const { username } = application || { username: '' };
  return { username };
}

export default connect(mapStateToProps)(NewLevelModal);
