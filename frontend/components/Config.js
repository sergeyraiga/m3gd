import moment from 'moment';
import classNames from 'classnames';
import Badge from '../components/Badge';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import ActionBtn from '../components/Base/ActionBtn';
import {
  showSubmitDeleteModal
} from '../actions';
import {
  runLevel, viewLevel, selectLevel, showMoveLevelModal, applyLevel
} from '../actions/levels';

import '../stylesheets/components/config';

class Config extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.dispatch(selectLevel(this.props.config));
  }

  render() {
    const config = this.props.config;
    const selected = this.props.levelId === this.props.selectedLevel.id;
    const active = this.props.levelId === this.props.currentLevel.id;
    const classObj = { 'level-config': true, active, selected };
    return (
      !selected ?
        <div className={classNames(classObj)} onClick={this.onClick}>
          <div className='level-config-card media'>
            <div className='media-body'>
              <div className='media-heading'>
                <div className='level-config-name'>{this.props.name}</div>
              </div>
              <a className='level-config-id level-config-info' href='#'></a>
              <div className='level-config-author level-config-info'>
                ID: {this.props.levelId}
              </div>
              <div className='level-config-author level-config-info'>
                Автор: {this.props.author}
              </div>
              {Object.keys(this.props.folders).length ?
                <div className='level-config-info'>
                  Папки: {this.props.folders.join(', ')}
                </div>
                : null
              }
              <div className='action-panel'>
                {/* <ActionBtn
                  data={config} desc='Запустить в игре' icon='play'
                  action={(dispatch, level) => dispatch(runLevel(level))}
                  />
                <ActionBtn
                  data={config} desc='Загрузить в редактор' icon='wrench'
                  action={(dispatch, level) => dispatch(applyLevel(level))}
                />
                <ActionBtn
                  data={config} desc='Переместить' icon='transfer'
                  action={(dispatch, level) => dispatch(showMoveLevelModal(level))}
                /> */}
                { Object.keys(this.props.bot).indexOf(this.props.levelId.toString()) >= 0 ?
                  this.props.bot[this.props.levelId] === 'running' ?
                    <Badge desc='Бот: run' type='badge-blue'/>
                    : <Badge desc='Бот: done!' type='badge-blue'/>
                  : null
                }
              </div>
            </div>
            <div className='media-right'>
              {/* <div style={{ display: 'table' }}>
                <div className="action-corner">
                  <ActionBtn
                    data={config} desc='Редактировать уровень' icon='pencil'
                    action={(dispatch, level) => dispatch(viewLevel(level))}
                    style={{ fontSize: '13px' }}
                  />
                <ActionBtn
                  data={config} desc='Удалить уровень'
                  style={{ fontSize: '13px' }} icon='remove'
                  action={(dispatch, level) => {
                    dispatch(selectLevel(level));
                    dispatch(showSubmitDeleteModal(level));
                  }}
                />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        :
        <div className={classNames(classObj)} onClick={this.onClick}>
          <div className='level-config-card media'>
            <div className='media-body'>
              <div className='media-heading'>
                <div className='level-config-name'>{this.props.name}</div>
              </div>
              <a className='level-config-id level-config-info' href='#'></a>
              <div className='level-config-author level-config-info'>
                ID: {this.props.levelId}
              </div>
              <div className='level-config-author level-config-info'>
                Автор: {this.props.author}
              </div>
              {Object.keys(this.props.folders).length ?
                <div className='level-config-info'>
                  Папки: {this.props.folders.join(', ')}
                </div>
                : null
              }
              <div className='action-panel'>
                <ActionBtn
                  data={this.props.selectedLevel} desc='Запустить в игре' icon='play'
                  action={(dispatch, level) => dispatch(runLevel(level))}
                  />
                <ActionBtn
                  data={this.props.selectedLevel} desc='Загрузить в редактор' icon='wrench'
                  action={(dispatch, level) => dispatch(applyLevel(level))}
                />
                <ActionBtn
                  data={this.props.selectedLevel} desc='Переместить' icon='transfer'
                  action={(dispatch, level) => dispatch(showMoveLevelModal(level))}
                  style={{ paddingRight: '5px' }}
                />
                { Object.keys(this.props.bot).indexOf(this.props.levelId.toString()) >= 0 ?
                  this.props.bot[this.props.levelId] === 'running' ?
                    <Badge desc='Бот: run' type='badge-blue'/>
                    : <Badge desc='Бот: done!' type='badge-blue'/>
                  : null
                }
              </div>
            </div>
            <div className='media-right'>
              <div style={{ display: 'table' }}>
                <div>
                  <ActionBtn
                    data={this.props.selectedLevel} desc='Редактировать уровень' icon='pencil'
                    action={(dispatch, level) => dispatch(viewLevel(level))}
                    style={{ fontSize: '13px' }}
                  />
                <ActionBtn
                  data={this.props.selectedLevel} desc='Удалить уровень'
                  style={{ fontSize: '13px' }} icon='remove'
                  action={(dispatch, level) => {
                    dispatch(selectLevel(level));
                    dispatch(showSubmitDeleteModal(level));
                  }}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Config.propTypes = {
  author: PropTypes.string.isRequired,
  bot: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  currentLevel: PropTypes.object.isRequired,
  selectedLevel: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  levelId: PropTypes.string.isRequired,
  folders: PropTypes.array.isRequired,
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const { currentLevel, selectedLevel, bot } = state;
  return { currentLevel, selectedLevel, bot };
}

export default connect(mapStateToProps)(Config);
