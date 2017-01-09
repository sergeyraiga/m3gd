import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { addChapter } from '../../actions/worlds';

class AddChapterBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    const props = this.props;
    props.dispatch(addChapter());
  }

  render() {
    return (
      <div>
        <Button className='add-chapter-btn' onClick={this.onClickAction}>
          Добавить главу
        </Button>
      </div>
    );
  }
}

AddChapterBtn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddChapterBtn);
