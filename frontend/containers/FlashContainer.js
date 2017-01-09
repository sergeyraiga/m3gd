import React, { Component, PropTypes } from 'react';
import RadioBtnGroup from '../components/Base/RadioBtnGroup';
import Categorization from '../components/Categorization';
import Splash from '../components/Base/Splash';
import Editor from '../components/Editor';
import Game from '../components/Game';
import { connect } from 'react-redux';
import { playLevel, updateLevel } from '../actions/levels';
import { editorReady, gameReady } from '../actions';
import Container from './Container'

import '../stylesheets/components/flashContainer';

class FlashContainer extends Component {
  constructor(props) {
    super(props);
    window.isReady = this.handleSWFCall.bind(this);
    window.saveLevel = this.saveLevel.bind(this);
    window.playLevel = this.playLevel.bind(this);
    this.editorLoaded = this.editorLoaded.bind(this);
    this.gameLoaded = this.gameLoaded.bind(this);
  }

  editorLoaded(editor) {
    this.props.dispatch(editorReady(editor));
  }

  gameLoaded(game) {
    this.props.dispatch(gameReady(game));
  }

  handleSWFCall() {
    console.log('SWFCall', arguments);
    if (arguments[0] === 'editor-app') {
      this.editorLoaded(this._editor);
    }
    if (arguments[0] === 'game-app') {
      this.gameLoaded(this._game);
    }
    return true;
  }

  saveLevel() {
    console.log('saveLevel', arguments);
    const level = JSON.stringify(arguments[0]);
    const id = this.props.currentLevel.id;
    this.props.dispatch(updateLevel({ id, level }));
  }

  playLevel() {
    console.log('playLevel', arguments);
    const level = JSON.stringify(arguments[0]);
    const id = this.props.currentLevel.id;
    this.props.dispatch(playLevel({ id, level }));
  }

  render() {
    const commonVars = {
      assets_url: this.props.assets_url,
      manifest: this.props.manifest,
      server_url: this.props.server_url
    };

    const editorVars = Object.assign({}, commonVars);
    const mode = this.props.mode;
    editorVars.id = 'editor-app';
    const gameVars = Object.assign({}, commonVars);
    gameVars.id = 'game-app';
    gameVars.servers = this.props.server_url;
    gameVars.assets_path = this.props.assets_url;
    return (
      <div className='app'>
        <div className='page-body'>
          { Object.keys(this.props.currentLevel).length !== 0 ?
            <RadioBtnGroup/>
            : <Splash/>
          }
          { Object.keys(this.props.currentLevel).length !== 0 && mode !== 'CATEGORIZATION' ?
            <div id='flashContainer'>
              <div className='flash'>
                { mode === 'EDITOR' ? <Editor/> : null }
                { mode === 'GAME' ? <Game/> : null }
              </div>
            </div>
            : null
          }
          { mode === 'CATEGORIZATION' ? <Categorization/> : null }
        </div>
      </div>
    );
  }
}

FlashContainer.propTypes = {
  assets_url: PropTypes.string,
  currentLevel: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  manifest: PropTypes.string,
  mode: PropTypes.string.isRequired,
  rangeParams: PropTypes.array.isRequired,
  server_url: PropTypes.string
};

function mapStateToProps(state) {
  const { currentLevel, application, mode, rangeParams } = state;
  const { manifest, assets_url, server_url } = application;
  return { currentLevel, manifest, assets_url, server_url, mode, rangeParams };
}

export default connect(mapStateToProps)(FlashContainer);
