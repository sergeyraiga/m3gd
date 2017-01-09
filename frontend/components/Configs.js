import React, { Component, PropTypes } from 'react';
import Config from './Config';
import { connect } from 'react-redux';
import SubmitModal from '../components/Base/SubmitModal';
import { closeSubmitDeleteModal } from '../actions';
import { deleteLevel } from '../actions/levels';

import '../stylesheets/components/folders';

class Configs extends Component {
  render() {
    return (
      <div className='configs-list' style={this.props.style}>
        {this.props.visibleLevels.map(
          config =>
            <Config
              name={config.name} config={config} author={config.author}
              levelId={config.id} key={config.id} folders={config.folders}
            />
        )}
        <SubmitModal
          title='Подтвердите удаление'
          body='Вы уверены, что хотите удалить?'
          actionName='Удалить'
          data={this.props.selectedLevel}
          show={this.props.submitDeleteModalShown}
          onHide={() => this.props.dispatch(closeSubmitDeleteModal())}
          action={(dispatch, id) => dispatch(deleteLevel({ id }))}
        />
      </div>
    );
  }
}

Configs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedLevel: PropTypes.object.isRequired,
  style: PropTypes.object,
  submitDeleteModalShown: PropTypes.bool.isRequired,
  visibleLevels: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { visibleLevels, submitDeleteModalShown, selectedLevel } = state;
  return { visibleLevels, submitDeleteModalShown, selectedLevel };
}

export default connect(mapStateToProps)(Configs);
