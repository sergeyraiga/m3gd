import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { deleteChapterLevel } from '../../actions/worlds';

class DeleteChapterLevelBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    const props = this.props;
    props.dispatch(deleteChapterLevel(this.props.level, this.props.chapter));
  }

  render() {
    return (
      <div className='delete-chapter-level-btn' onClick={this.onClickAction}>
        <Glyphicon glyph='remove' className='delete-glyph'/>
      </div>
    );
  }
}

DeleteChapterLevelBtn.propTypes = {
  chapter: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  level: PropTypes.object,
  style: PropTypes.object
};

const mapStateToProps = state => {
  const { chapters } = state;
  return { chapters };
};

export default connect(mapStateToProps)(DeleteChapterLevelBtn);
