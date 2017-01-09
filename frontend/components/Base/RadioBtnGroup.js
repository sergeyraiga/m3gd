import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { switchMode } from '../../actions';

import '../../stylesheets/components/radioButtonGroup';

class RadioBtnGroup extends Component {
  render() {
    const mode = this.props.mode;
    return (
      <div className='component-container'>
        <div className='btn-group' data-toggle='buttons'>
          {this.props.modes.map(
            item =>
              (item.id === mode ?
                <label className='btn active radio-btn-group' key={item.id}>
                  <input type='radio' name='0' checked=''/>
                  {item.name}
                </label>
                :
                <label className='btn radio-btn-group' key={item.id}
                  onClick={() => this.props.dispatch(switchMode(item.id))}>
                  <input type='radio' name='0' checked=''/>
                  {item.name}
                </label>
              ), this
          )}
        </div>
      </div>
    );
  }
}

RadioBtnGroup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  modes: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { mode, modes } = state;
  return { mode, modes };
}

export default connect(mapStateToProps)(RadioBtnGroup);
