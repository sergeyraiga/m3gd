import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { moveLevel } from '../../actions/levels';
import { getFolders } from '../../actions/folders';

class MoveLevelModal extends Component {

  constructor(props) {
    super(props);
    this.moveLevel = this.moveLevel.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  selectFolder(e) {
    this._folderId = e.target.value;
  }

  moveLevel() {
    const oldFolderId = this.props.folders[0] ? this.props.folders[0].id : null;
    const folderId = this._folderId || oldFolderId;
    const levelId = this.props.selectedLevel.id;
    this.props.dispatch(moveLevel(levelId, folderId));
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Перемещение уровня</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Папки</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.selectFolder}>
              {this.props.folders.map(item =>
                <option value={item.id} key={item.id}>{item.name}</option>
              )}
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide()}>Отмена</Button>
          <Button bsStyle="default" onClick={this.moveLevel}>Переместить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

MoveLevelModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired,
  onHide: PropTypes.func.isRequired,
  selectedLevel: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { selectedLevel, folders } = state;
  return { selectedLevel, folders };
}

export default connect(mapStateToProps)(MoveLevelModal);
