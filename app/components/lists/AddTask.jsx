const React = require('react');
const ReactDOM = require('react-dom');

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    if (e.keyCode === 13) {
      const list = this.props.list;
      const task = this.task.value;

      this.props.add(list, task);
      this.task.value = '';
    }
  }

  render() {
    const key = `new_${this.props.list}`;

    return (
      <li>
        <label htmlFor={key}>+</label>
        <input
          type="text"
          id={key}
          ref={(c) => { this.task = c; }}
          onKeyDown={this.handleSubmit}
        />
      </li>
    );
  }
}

AddTask.propTypes = {
  add: React.PropTypes.func.isRequired,
  list: React.PropTypes.number.isRequired,
};

module.exports = AddTask;
