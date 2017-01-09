import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';
import Badge from '../components/Badge';
import * as react_redux from 'react-redux';
import ActionBtn from '../components/Base/ActionBtn';
import {
  showSubmitDeleteModal
} from '../actions';
import {
  runLevel, viewLevel, selectLevel, showMoveLevelModal, applyLevel
} from '../actions/levels';

import '../stylesheets/components/config';

const style = {};

const cardSource = {
  beginDrag(props) {
    return { id: props.id, index: props.index };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({ connectDropTarget: connect.dropTarget() }))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Card extends Component {

  static propTypes = {
    author: PropTypes.string.isRequired,
    bot: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    currentLevel: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    folders: PropTypes.array.isRequired,
    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveCard: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    selectedLevel: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.dispatch(selectLevel(this.props.config));
  }

  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const config = this.props.config;
    const selected = this.props.config.id === this.props.selectedLevel.id;
    const active = this.props.config.id === this.props.currentLevel.id;
    const classObj = { 'level-config': true, active, selected };

    return connectDragSource(connectDropTarget(
      !selected ?
        <div className={classNames(classObj)} onClick={this.onClick} style={{ ...style, opacity }}>
          <div className='level-config-card media'>
            <div className='media-body'>
              <div className='media-heading'>
                <div className='level-config-name'>{this.props.name}</div>
              </div>
              <a className='level-config-id level-config-info' href='#'></a>
              <div className='level-config-author level-config-info'>
                ID: {config.id}
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
                { Object.keys(this.props.bot).indexOf(config.id) >= 0 ?
                  this.props.bot[config.id] === 'running' ?
                    <Badge desc='Бот: run' type='badge-blue'/>
                    : <Badge desc='Бот: done!' type='badge-blue'/>
                  : null
                }
              </div>
            </div>
            <div className='media-right'></div>
          </div>
        </div>
        :
        <div className={classNames(classObj)}>
          <div className='level-config-card media'>
            <div className='media-body'>
              <div className='media-heading'>
                <div className='level-config-name'>{this.props.name}</div>
              </div>
              <a className='level-config-id level-config-info' href='#'></a>
              <div className='level-config-author level-config-info'>
                ID: {config.id}
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
                  data={this.props.selectedLevel} desc='Запустить в игре'
                  icon='play'
                  action={(dispatch, level) => dispatch(runLevel(level))}
                  />
                <ActionBtn
                  data={this.props.selectedLevel} desc='Загрузить в редактор'
                  icon='wrench'
                  action={(dispatch, level) => dispatch(applyLevel(level))}
                />
                <ActionBtn
                  data={this.props.selectedLevel} desc='Переместить'
                  style={{ paddingRight: '5px' }} icon='transfer'
                  action={(dispatch, level) => dispatch(showMoveLevelModal(level))}
                />
              { Object.keys(this.props.bot).indexOf(config.id) >= 0 ?
                  this.props.bot[config.id] === 'running' ?
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
                    data={this.props.selectedLevel} desc='Редактировать уровень'
                    style={{ fontSize: '13px' }} icon='pencil'
                    action={(dispatch, level) => dispatch(viewLevel(level))}
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
    ));
  }
}

function mapStateToProps(state) {
  const { currentLevel, selectedLevel, bot } = state;
  return { currentLevel, selectedLevel, bot };
}

export default react_redux.connect(mapStateToProps)(Card);
