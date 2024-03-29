import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.removeTask = (list, index) => this.props.removeTask.bind(null, list, index);
  }

  render() {
    const { details, index, list } = this.props;

    return (
      <li>
        <button onClick={this.removeTask(list, index)}>
          <span className="circle" />
          <span className="delete"><span className="icon-trash" /></span>
        </button>
        <span>{ details }</span>
      </li>
    );
  }
}

Task.propTypes = {
  details: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  list: React.PropTypes.string.isRequired,
  removeTask: React.PropTypes.func.isRequired,
};

export default Task;
