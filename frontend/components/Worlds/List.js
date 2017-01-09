// Worlds

import Card from './Card';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubmitModal from '../Base/SubmitModal';
import { remove } from '../../actions/worlds';
import { closeSubmitDeleteModal } from '../../actions';

import '../../stylesheets/components/folders';

class List extends Component {
  render() {
    return (
      <div className='folders-list'>
        {this.props.visibleWorlds.map(
          world => <Card key={world.id} data={world} dispatch={this.props.dispatch}/>
        )}
        <SubmitModal
          title='Подтвердите удаление'
          body='Вы уверены, что хотите удалить?'
          actionName='Удалить'
          data={this.props.selectedWorld}
          show={this.props.submitDeleteModalShown}
          onHide={() => this.props.dispatch(closeSubmitDeleteModal())}
          action={(dispatch, id) => dispatch(remove({ id }))}
        />
      </div>
    );
  }
}

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedWorld: PropTypes.object.isRequired,
  submitDeleteModalShown: PropTypes.bool.isRequired,
  visibleWorlds: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { visibleWorlds, selectedWorld, submitDeleteModalShown } = state;
  return { visibleWorlds, selectedWorld, submitDeleteModalShown };
}

export default connect(mapStateToProps)(List);
