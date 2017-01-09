import React, { Component, PropTypes } from 'react';
import { Input, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { changeRangeParams } from '../actions';

import classNames from 'classnames';

import '../stylesheets/components/tree';

var TreeNode = React.createClass({
  getInitialState: function() {
    return {
      visible: this.props.visible
    };
  },

  handleChange: function(event) {
    console.log(event.target.name + ': ' + event.target.value);
    this.props.dispatch(changeRangeParams(event.target.name, event.target.value));
  },

  render: function() {
    var childNodes;
    const classObj = {
      togglable: true,
      "togglable-down": this.state.visible,
      "togglable-up": !this.state.visible
    };

    if (this.props.node.vars != null) {
      childNodes = this.props.node.vars.map((node, index) =>
        <div key={index}><TreeNode node={node} visible={false} dispatch={this.props.dispatch} state={this.props.state} key={node.name}/></div>
      );
    }

    var style;
    if (!this.state.visible) {
      style = { display: "none"};
    }
    else {
      style = { display: 'block', paddingLeft: '25px' }
    }

    const tooltip = (
      <Tooltip id='param-name'><strong>{this.props.node.name}</strong></Tooltip>
    );

    return (
      <div>
        <div className={classNames(classObj)}>
          <span onClick={this.toggle} style={{ cursor: 'pointer' }}>
            {this.props.node.desc}
          </span>
        </div>
        { this.props.node.vars && this.props.node.vars.length > 1 ?
          <ul style={style} className="list-unstyled">
            {childNodes}
          </ul>
          : <div style={style}>
              <div className="col-xs-6" style={{ float: 'none', paddingLeft: '0px', paddingRight: '30px' }}>
                <div style={{ display: 'table' }}>
                  <input
                    type="text" className="form-control input-sm"
                    style={{ display: 'table-cell' }}
                    name={this.props.node.name} onChange={this.handleChange}
                    value={this.props.state[this.props.node.name]}
                  />
                  <OverlayTrigger placement="right" overlay={tooltip}>
                    <Glyphicon
                      glyph='question-sign'
                      style={{ display: 'table-cell', paddingLeft: '10px', color: '#555' }}
                    />
                  </OverlayTrigger>
                </div>
              </div>

            </div>
        }
      </div>
    );
  },
  toggle: function() {
    this.setState({ visible: !this.state.visible });
  }
});

TreeNode.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default TreeNode;
