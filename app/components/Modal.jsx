import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <ReactCSSTransitionGroup
          transitionName={this.props.transitionName}
          transitionEnterTimeout={this.props.transitionEnterTimeout}
          transitionLeaveTimeout={this.props.transitionLeaveTimeout}
        >
          <div className="modal">
            <div className="background" />
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      );
    }

    return (
      <ReactCSSTransitionGroup
        transitionName={this.props.transitionName}
        transitionEnterTimeout={this.props.transitionEnterTimeout}
        transitionLeaveTimeout={this.props.transitionLeaveTimeout}
      />
    );
  }
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  transitionName: React.PropTypes.string.isRequired,
  transitionEnterTimeout: React.PropTypes.number.isRequired,
  transitionLeaveTimeout: React.PropTypes.number.isRequired,
  children: React.PropTypes.node.isRequired,
};

module.exports = Modal;
