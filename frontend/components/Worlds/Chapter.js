import React, { Component, PropTypes } from 'react';
import AddLevelBtn from './AddLevelBtn';
import ChapterLevel from './ChapterLevel';
import DeleteChapterlBtn from './DeleteChapterBtn';
import { connect } from 'react-redux';

class Chapter extends Component {

  render() {
    return (
      <div className='chapter-levels-container'>
        <DeleteChapterlBtn chapter={this.props.chapter}/>
        <div style={{ fontSize: '22px', marginBottom: '10px' }}>
          Глава {this.props.index + 1}
        </div>
        {this.props.chapter.levels.map((level, index) =>
          <ChapterLevel level={level} chapter={this.props.chapter} index={index} key={index}/>
        )}
        <AddLevelBtn chapter={this.props.chapter}/>
      </div>
    );
  }
}

Chapter.propTypes = {
  chapter: PropTypes.object,
  index: PropTypes.number
};

export const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Chapter);
