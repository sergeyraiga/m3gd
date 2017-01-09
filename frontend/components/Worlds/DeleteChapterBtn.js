import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { deleteChapter } from '../../actions/worlds';

class DeleteChapterBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    const props = this.props;
    props.dispatch(deleteChapter(this.props.chapter));
  }

  render() {
    return (
      <div className='delete-chapter-level-btn' onClick={this.onClickAction}>
        <Glyphicon glyph='remove' className='delete-glyph'/>
      </div>
    );
  }
}

DeleteChapterBtn.propTypes = {
  chapter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = state => {
  const { chapters } = state;
  return { chapters };
};

export default connect(mapStateToProps)(DeleteChapterBtn);
