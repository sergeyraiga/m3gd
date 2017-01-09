import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, ControlLabel, FormGroup, Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/xcode';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import '../stylesheets/components/modal';

import { getKarmaMap, setKarmaMap } from '../actions/karma';

class KarmaMapViewModal extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    render() {
        this.karmaMapJson = this.props.karma_map;
        return (
            <Modal {...this.props}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Карта кармы"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Panel header={''}>
                        <AceEditor
                            mode="json"
                            width='100%'
                            height='500px'
                            theme="xcode"
                            name="level"
                            editorProps={{ '$blockScrolling': Infinity }}
                            onChange={value => (this._jsonEditor = value)}
                            value={this.karmaMapJson}
                        />
                    </Panel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.save()}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    save(){
        //this.props.dispatch(setKarmaMap(this.karmaMapJson));
        //this.props.dispatch(getKarmaMap());
    }
}

KarmaMapViewModal.propTypes = {
    currentFolder: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedLevel: PropTypes.object.isRequired,
    karma_map: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const { selectedLevel, currentFolder, karma_map } = state;
    return { selectedLevel, currentFolder, karma_map };
}

export default connect(mapStateToProps)(KarmaMapViewModal);