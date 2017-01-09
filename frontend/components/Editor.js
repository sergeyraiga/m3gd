import React, { Component, PropTypes } from 'react';
import ReactSWF from 'react-swf';
import { connect } from 'react-redux';
import { playLevel, updateLevel } from '../actions/levels';
import { editorReady } from '../actions';

class Editor extends Component {
  constructor(props) {
    super(props);
    window.isReady = this.handleSWFCall.bind(this);
    window.saveLevel = this.saveLevel.bind(this);
    window.playLevel = this.playLevel.bind(this);
    this.editorLoaded = this.editorLoaded.bind(this);
  }

  editorLoaded(editor) {
    this.props.dispatch(editorReady(editor));
  }

  handleSWFCall() {
    console.log('SWFCall', arguments);
    if (arguments[0] === 'editor-app') {
      this.editorLoaded(this._editor);
    }
    return true;
  }

  saveLevel() {
    console.log('saveLevel', arguments);
    const level = JSON.stringify(arguments[0]);
    const id = this.props.currentLevel.id;
    if (this.props.currentFolder.id) {
      this.props.dispatch(
        updateLevel({ id, level, folder_id: this.props.currentFolder.id })
      );
    }
    else {
      this.props.dispatch(updateLevel({ id, level }));
    }
  }

  playLevel() {
    console.log('playLevel', arguments);
    const level = JSON.stringify(arguments[0]);
    const id = this.props.currentLevel.id;
    this.props.dispatch(playLevel({ id, level }));
  }

  render() {
    const vars = {
      id: 'editor-app',
      assets_url: this.props.assets_url,
      manifest: this.props.manifest,
      server_url: this.props.server_url
    };
    return (
      <ReactSWF
        id='editor-app' width='960' height='900' wmode='direct' flashVars={vars}
        src={'/static/swf/editor.swf?rev=' + (new Date()).getTime().toString()}
        ref={c => (this._editor = c)}
      />
    );
  }
}

Editor.propTypes = {
  assets_url: PropTypes.string,
  currentFolder: PropTypes.object.isRequired,
  currentLevel: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  manifest: PropTypes.string,
  server_url: PropTypes.string
};

function mapStateToProps(state) {
  const { currentLevel, currentFolder, application } = state;
  const { manifest, assets_url, server_url } = application;
  return { currentLevel, currentFolder, manifest, assets_url, server_url };
}

export default connect(mapStateToProps)(Editor);
