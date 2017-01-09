import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FilterPanel from '../FilterPanel';
import LevelsPanel from './LevelsPanel';
import Configs from '../Configs';
import Container from '../../containers/Container'
import { getLevels } from '../../actions/levels';

class Levels extends Component {

  componentDidMount() {
    this.props.dispatch(getLevels());
  }

  render() {
    return (
      <div className='container-fluid'>
        <FilterPanel
          dispatch={this.props.dispatch}
          username={this.props.username}
        />
        <LevelsPanel/>
        <Container/>
      </div>
    );
  }
}

Levels.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string
};

function mapStateToProps(state) {
  const { application } = state;
  const { username } = application;
  return { username };
}

export default connect(mapStateToProps)(Levels);
