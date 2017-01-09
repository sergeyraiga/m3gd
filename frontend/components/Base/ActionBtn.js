import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap';

class ActionBtn extends Component {

  constructor(props) {
    super(props);
    this.onClickAction = this.onClickAction.bind(this);
    this.tooltip = (
      <Tooltip id='level-play'>
        <strong>{this.props.desc}</strong>
      </Tooltip>
    );
  }

  onClickAction() {
    const props = this.props;
    props.action(props.dispatch, props.data);
  }

  render() {
    return (
      <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
        <OverlayTrigger placement="bottom" overlay={this.tooltip} delay={500} delayHide={10}>
          <Glyphicon
            className='level-config-action' glyph={this.props.icon}
            onClick={this.onClickAction} style={this.props.style}
          />
        </OverlayTrigger>
    </div>
    );
  }
}

ActionBtn.propTypes = {
  action: PropTypes.func,
  data: PropTypes.object.isRequired,
  desc: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ActionBtn);
