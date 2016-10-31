import React from 'react';

class Task extends React.Component {
  render() {
    const { details, index } = this.props;

    return (
      <li className="menu-fish">
        <p>{details.item}</p>
        <button onClick={this.props.remove.bind(null, index)}>Delete</button>
      </li>
    )
  }
}

Task.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired
};

export default Task;
