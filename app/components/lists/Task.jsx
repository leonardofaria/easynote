import React from 'react';

// why this is not a ES6 class: https://goo.gl/1WHVmj
function Task() {
  const { details, index } = this.props;

  return (
    <li>
      <span>{ details.item }</span>
      <button onClick={this.props.remove.bind(null, index)}>Delete</button>
    </li>
  );
}

export default Task;
