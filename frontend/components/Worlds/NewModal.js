import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class NewModal extends Component {

  constructor(props) {
    super(props);
    this.errorMessage = this.errorMessage.bind(this);
    this.submit = this.submit.bind(this);
  }

  errorMessage(element, message) {
    console.error(message);
  }

  submit() {
    const data = {};
    const nameInputValue = this._worldName;
    if (nameInputValue !== '') {
      data.name = nameInputValue;
      data.description = this._worldDesc;
    }
    else {
      this.errorMessage(this._worldName, 'Имя не может быть пустым');
      return 1;
    }
    this.props.createWorld(data);
    return 0;
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Создание нового мира</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Название</ControlLabel>
              <FormControl
                type="text"
                onChange={e => (this._worldName = e.target.value)}
              />
            </FormGroup>
            {/* <FormGroup controlId="formControlsText">
              <ControlLabel>Описание</ControlLabel>
              <FormControl
                type="text"
                onChange={e => (this._worldDesc = e.target.value)}
              />
            </FormGroup> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.submit()}>Создать</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewModal.propTypes = {
  createWorld: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  username: PropTypes.string
};

function mapStateToProps(state) {
  const { application } = state;
  const { username } = application || { username: '' };
  return { username };
}

export default connect(mapStateToProps)(NewModal);
