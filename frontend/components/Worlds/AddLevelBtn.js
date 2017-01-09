import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { addChapterLevel } from '../../actions/worlds';

class AddLevelBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    const props = this.props;
    props.dispatch(addChapterLevel(this.props.chapter));
  }

  render() {
    return (
      <div>
        <Button className='add-level-btn' onClick={this.onClickAction}>
          Добавить уровень
        </Button>
      </div>
    );
  }
}

AddLevelBtn.propTypes = {
  chapter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddLevelBtn);
