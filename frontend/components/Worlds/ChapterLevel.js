import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DeleteChapterLevelBtn from './DeleteChapterLevelBtn';
import { showAssignLevelModal } from '../../actions/worlds';

class ChapterLevel extends Component {

  constructor(props) {
    super(props);
    this.showAssignModal = this.showAssignModal.bind(this);
  }

  showAssignModal() {
    this.props.dispatch(
      showAssignLevelModal(this.props.level, this.props.chapter)
    );
  }

  render() {
    return (
      <div className='chapter-levels-container'>
        <DeleteChapterLevelBtn chapter={this.props.chapter} level={this.props.level}/>
        <div onClick={this.showAssignModal}>
          <div className='chapter-levels-header'>
            Уровень {this.props.index + 1}
            <br/>
            {this.props.level.levelId ?
               'ID: ' + this.props.level.levelId.join(',') : null}
          </div>
        </div>
      </div>
    );
  }
}

ChapterLevel.propTypes = {
  chapter: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number,
  level: PropTypes.object
};

export const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ChapterLevel);
