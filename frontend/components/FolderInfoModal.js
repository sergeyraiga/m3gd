import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createFolder, editFolder } from '../actions/folders';

import '../stylesheets/components/modal';

class FolderInfoModal extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.saveAs = this.saveAs.bind(this);
  }

  onDescChange(e) {
    this._levelDesc = e.target.value;
  }

  save() {
    const folder = this.props.selectedFolder;
    const name = this._folderName || folder.name;
    const description = this._folderDesc || folder.description;
    if (this.props.currentFolder.id) {
      this.props.dispatch(editFolder({
        ...this.props.selectedFolder,
        folder, name, description, folder_id: this.props.currentFolder.id
      }));
    }
    else {
      this.props.dispatch(
        editFolder({ ...this.props.selectedFolder, folder, name, description })
      );
    }

  }

  saveAs() {
    const folder = this.props.selectedFolder;
    const name = this._folderName || folder.name;
    const description = this._folderDesc || folder.description;
    this.props.dispatch(createFolder({ folder, name, description }));
  }

  render() {
    const folder = this.props.selectedFolder;
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>{folder.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Название</ControlLabel>
              <FormControl type="text"
                defaultValue={folder.name}
                onChange={e => (this._folderName = e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Описание</ControlLabel>
              <FormControl
                componentClass="textarea" defaultValue={folder.description}
                onChange={e => (this._folderDesc = e.target.value)}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.saveAs()}>Сохранить как</Button>
          <Button onClick={() => this.save()}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FolderInfoModal.propTypes = {
  currentFolder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  selectedFolder: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { selectedFolder, currentFolder } = state;
  return { selectedFolder, currentFolder };
}

export default connect(mapStateToProps)(FolderInfoModal);
