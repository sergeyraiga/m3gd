// Worlds

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import ActionBtn from '../Base/ActionBtn';

import { openWorld, selectWorld } from '../../actions/worlds';
import { showSubmitDeleteModal } from '../../actions';

import '../../stylesheets/components/card';

class Card extends Component {

  constructor(props) {
    super(props);
    this.activate = this.activate.bind(this);
  }

  activate() {
    this.props.dispatch(openWorld(this.props.data));
  }

  render() {
    const data = this.props.data;
    const classObj = { 'card': true };
    const updated_at = Date.parse(data.updatedAt);
    return (
      <div className={classNames(classObj)}>
        <div className='media-card media'>
          <div className='media-body'>
            <div className='media-heading'>
              <div style={{ display: 'table-row' }}>
                <div style={{ display: 'table-cell' }} className='card-name'>
                  {data.name}
                </div>
                <div className="action-corner">
                  <ActionBtn
                    data={data} desc='Заблокировать' icon='lock'
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>
            </div>
            <div onClick={this.activate} style={{ cursor: 'pointer' }}>
              <div className='card-info'>
                ID: {data.id}
              </div>
              <div className='card-info'>
                Автор: {data.author}
              </div>
              <div className='card-info'>
                Дата обновления: {moment(updated_at).format('YYYY-MM-DD HH:mm')}
              </div>
            </div>
            <div className='action-panel'></div>
          </div>
          <div className='media-right'>
            <div style={{ display: 'table' }}>
              <div className="action-corner">
                <ActionBtn
                  data={data} desc='Редактировать папку' icon='pencil'
                  style={{ fontSize: '13px' }}
                  action={(dispatch, folder) => dispatch(viewWorld(folder))}
                />
                <ActionBtn
                  data={data} desc='Удалить папку'
                  style={{ fontSize: '13px' }} icon='remove'
                  action={(dispatch, world) => {
                    dispatch(selectWorld(world));
                    dispatch(showSubmitDeleteModal(world));
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

Card.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Card;
