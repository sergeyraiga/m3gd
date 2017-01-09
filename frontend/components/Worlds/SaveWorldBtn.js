import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { saveWorld } from '../../actions/worlds';

class SaveWorldBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    const props = this.props;
    props.dispatch(saveWorld(this.props.chapters));
  }

  render() {
    return (
      <div>
        <Button className='save-world-btn' onClick={this.onClickAction}>
          Сохранить
        </Button>
      </div>
    );
  }
}

SaveWorldBtn.propTypes = {
  chapters: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
};

const mapStateToProps = state => {
  const { chapters } = state;
  return { chapters };
};

export default connect(mapStateToProps)(SaveWorldBtn);
