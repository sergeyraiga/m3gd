import React, { Component, PropTypes } from 'react';
import { Modal, Input, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { convertLevelAndSave } from '../../actions/levels';

import 'brace/mode/json';
import 'brace/theme/github';
import '../../stylesheets/components/filepicker';

class ImportLevelModal extends Component {

  constructor(props) {
    super(props);
    this.convert = this.convert.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  errorMessage(element, message) {
    console.error(message);
  }

  convert() {
    const level = this._jsonEditor.editor.getValue();
    const nameInputValue = this._levelName.refs.input.value;
    if (nameInputValue !== '') {
      const name = nameInputValue;
      const desc = this._levelDesc.refs.input.value;
      this.props.dispatch(convertLevelAndSave(name, desc, level));
    }
    else {
      this.errorMessage(this._name, 'Имя не может быть пустым');
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Импортировать уровень</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type="text" label="Название" ref={c => (this._levelName = c)}/>
          <Input type="textarea" label="Описание" ref={c => (this._levelDesc = c)}/>
        <br/>
          <AceEditor
            mode="json"
            width='100%'
            height='500px'
            theme="github"
            name="level"
            ref={c => (this._jsonEditor = c)}
            value={''}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.convert}>Сконвертировать</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ImportLevelModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedLevel } = state;
  return { selectedLevel };
}

export default connect(mapStateToProps)(ImportLevelModal);
