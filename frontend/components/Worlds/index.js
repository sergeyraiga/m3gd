import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Splash from '../Base/Splash';
import Panel from './Panel';
import List from './List';
import FilterPanel from './FilterPanel';
import * as worlds from '../../actions/worlds';

class Worlds extends Component {

  componentDidMount() {
    this.props.dispatch(worlds.getWorlds());
  }

  render() {
    return (
      <div className='container-fluid'>
        <FilterPanel
          dispatch={this.props.dispatch}
          currentFolder={this.props.currentWorld}
          username={this.props.username}
        />
        <Panel/>
        {this.props.visibleWorlds.length ?
          <List/>
          :
          <Splash style={{ paddingTop: '15px' }}>
            Список миров<br/>пуст
          </Splash>
        }
      </div>
    );
  }
}

Worlds.propTypes = {
  currentWorld: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string,
  visibleWorlds: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { visibleWorlds, currentWorld, application } = state;
  const { username } = application;
  return { visibleWorlds, currentWorld, username };
}

export default connect(mapStateToProps)(Worlds);
