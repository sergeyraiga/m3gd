import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class SubmitModal extends Component {

  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
  }

  submitAction() {
    const id = this.props.data.id;
    this.props.action(this.props.dispatch, id);
  }

  render() {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide()}>Отмена</Button>
          <Button bsStyle="danger" onClick={this.submitAction}>
            {this.props.actionName}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

SubmitModal.propTypes = {
  action: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(SubmitModal);
