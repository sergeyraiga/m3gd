import Card from '../Base/Card';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubmitModal from '../Base/SubmitModal';
import { closeSubmitDeleteModal } from '../../actions';
import { deleteFolder } from '../../actions/folders';

import '../../stylesheets/components/folders';

class FoldersList extends Component {
  render() {
    return (
      <div className='folders-list'>
        {this.props.visibleFolders.map(
          folder => <Card key={folder.id} data={folder} dispatch={this.props.dispatch}/>
        )}
        <SubmitModal
          title='Подтвердите удаление'
          body='Вы уверены, что хотите удалить?'
          actionName='Удалить'
          data={this.props.selectedFolder}
          show={this.props.submitDeleteModalShown}
          onHide={() => this.props.dispatch(closeSubmitDeleteModal())}
          action={(dispatch, id) => dispatch(deleteFolder({ id }))}
        />
      </div>
    );
  }
}

FoldersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedFolder: PropTypes.object.isRequired,
  submitDeleteModalShown: PropTypes.bool.isRequired,
  visibleFolders: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { visibleFolders, selectedFolder, submitDeleteModalShown } = state;
  return { visibleFolders, selectedFolder, submitDeleteModalShown };
}

export default connect(mapStateToProps)(FoldersList);
