import React, { Component, PropTypes } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { openQueueEditor } from '../actions/bot_queue';
import { openKarmaMapEditor } from '../actions/karma';
import { openKarmaPresetsEditor } from '../actions/karma';

import '../stylesheets/components/loader';

class NavigationBar extends Component {
  render() {
    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>M3</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>Конфигурация уровней</Navbar.Text>
          <Loader loaded={!this.props.loaded} scale={0.5}
            width={4} length={8} speed={0.7} color={'#555'}
          />
          <Nav pullRight>
            <NavItem eventKey={3} className='nv-item'onClick={() => this.props.dispatch(openKarmaPresetsEditor(this.props.karma_presets))}>
              Пресеты кармы
            </NavItem>
            <NavItem eventKey={2} className='nv-item'onClick={() => this.props.dispatch(openKarmaMapEditor(this.props.karma_map))}>
              Карты кармы
            </NavItem>
            <NavItem eventKey={1} className='nv-item'onClick={() => this.props.dispatch(openQueueEditor())}>
              Бот
            </NavItem>
            <NavItem href='#'>{this.props.username}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


NavigationBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loaded: PropTypes.bool,
  username: PropTypes.string,
  karma_map: PropTypes.string,
  karma_presets: PropTypes.string
};

export default connect(() => ({}))(NavigationBar);
