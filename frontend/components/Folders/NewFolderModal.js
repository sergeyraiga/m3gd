import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class NewFolderModal extends Component {

  constructor(props) {
    super(props);
    this.errorMessage = this.errorMessage.bind(this);
    this.submitFolder = this.submitFolder.bind(this);
  }

  errorMessage(element, message) {
    console.error(message);
  }

  submitFolder() {
    const data = {};
    const nameInputValue = this._folderName;
    if (nameInputValue !== '') {
      data.name = nameInputValue;
      data.description = this._folderDesc;
    }
    else {
      this.errorMessage(this._name, 'Имя не может быть пустым');
      return 1;
    }
    this.props.createFolder(data);
    return 0;
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Создание новой папки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Название</ControlLabel>
              <FormControl
                type="text"
                onChange={e => (this._folderName = e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Описание</ControlLabel>
              <FormControl
                type="text"
                onChange={e => (this._folderDesc = e.target.value)}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.submitFolder()}>Создать</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewFolderModal.propTypes = {
  createFolder: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  username: PropTypes.string
};

function mapStateToProps(state) {
  const { application } = state;
  const { username } = application || { username: '' };
  return { username };
}

export default connect(mapStateToProps)(NewFolderModal);
