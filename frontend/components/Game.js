import React, { Component, PropTypes } from 'react';
import ReactSWF from 'react-swf';
import { connect } from 'react-redux';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { playLevel } from '../actions/levels';
import { gameReady } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    window.isReady = this.handleSWFCall.bind(this);
    window.playLevel = this.playLevel.bind(this);
    this.gameLoaded = this.gameLoaded.bind(this);
  }

  gameLoaded(game) {
    this.props.dispatch(gameReady(game));
  }

  handleSWFCall() {
    console.log('SWFCall', arguments);
    if (arguments[0] === 'game-app') {
      this.gameLoaded(this._game);
    }
    return true;
  }

  playLevel() {
    console.log('playLevel', arguments);
    const level = JSON.stringify(arguments[0]);
    const id = this.props.currentLevel.id;
    this.props.dispatch(playLevel({ id, level }));
  }

  seed(e) {
    this._seed = e.target.value;
  }

  runPlayer() {
    console.log('runPlayer');
  }

  render() {
    const vars = {
      id: 'game-app',
      assets_url: this.props.assets_url,
      manifest: this.props.manifest,
      server_url: this.props.server_url,
      servers: this.props.server_url,
      assets_path: this.props.assets_url
    };
    return (
        <Form>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel className='categorization-param'>Seed</ControlLabel>
            </Col>
            <Col sm={2}>
              <FormControl type="text" placeholder="" onChange={this.seed}/>
            </Col>
            <Col sm={2}>
              <Button className='run-bot-btn' onClick={this.runPlayer}>Пуск</Button>
            </Col>
          </FormGroup>
          <ReactSWF
            id='game-app' width='1000' height='700' wmode='direct' flashVars={vars}
            src={'/static/swf/game.swf?rev=' + (new Date()).getTime().toString()} ref={c => (this._game = c)}
          />
        </Form>
    );
  }
}

Game.propTypes = {
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

export default connect(mapStateToProps)(Game);
