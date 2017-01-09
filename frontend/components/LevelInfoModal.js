import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, ControlLabel, FormGroup, Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { createLevel } from '../actions';
import { editLevel } from '../actions/levels';

import 'brace/mode/json';
import 'brace/theme/xcode';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import '../stylesheets/components/modal';

class LevelInfoModal extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.saveAs = this.saveAs.bind(this);
  }

  onDescChange(e) {
    this._levelDesc = e.target.value;
  }

  save() {
    const lvl = this.props.selectedLevel;
    const level = this._jsonEditor || lvl.level;
    const name = this._levelName || lvl.name;
    const description = this._levelDesc || lvl.description;
    if (this.props.currentFolder.id) {
      this.props.dispatch(editLevel(
        {
          ...this.props.selectedLevel,
          level, name, description, folder_id: this.props.currentFolder.id
        }
      ));
    }
    else {
      this.props.dispatch(
        editLevel({ ...this.props.selectedLevel, level, name, description })
      );
    }

  }

  saveAs() {
    const lvl = this.props.selectedLevel;
    const level = this._jsonEditor || lvl;
    const name = this._levelName || lvl.name;
    const description = this._levelDesc || lvl.description;
    this.props.dispatch(
      createLevel({ level, name, description })
    );
  }

  render() {
    const level = this.props.selectedLevel;
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.selectedLevel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Название</ControlLabel>
              <FormControl type="text"
                defaultValue={level.name}
                onChange={e => (this._levelName = e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Описание</ControlLabel>
              <FormControl
                componentClass="textarea" defaultValue={level.description}
                onChange={e => (this._levelDesc = e.target.value)}
              />
            </FormGroup>
          </form>
          { level.level ?
            <Panel header={'Уровень'}>
              <AceEditor
                mode="json"
                width='100%'
                height='500px'
                theme="xcode"
                name="level"
                editorProps={{ '$blockScrolling': Infinity }}
                onChange={value => (this._jsonEditor = value)}
                value={JSON.stringify(JSON.parse(level.level), null, 2)}
              />
            </Panel>
             : null
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.saveAs()}>Сохранить как</Button>
          <Button onClick={() => this.save()}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

LevelInfoModal.propTypes = {
  currentFolder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  selectedLevel: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { selectedLevel, currentFolder } = state;
  return { selectedLevel, currentFolder };
}

export default connect(mapStateToProps)(LevelInfoModal);
