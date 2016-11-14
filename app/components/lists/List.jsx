import Task from './Task';

const React = require('react');
const AddTask = require('../lists/AddTask');

class List extends React.Component {
  constructor(props) {
    super(props);
    this.removeList = index => this.props.removeList.bind(null, index);
  }

  render() {
    const { details, index } = this.props;
    let tasks;

    if (details.tasks !== undefined) {
      tasks = (details.tasks.map((task, idx) =>
        <Task
          details={task}
          key={idx}
          index={idx}
          list={index}
          removeTask={this.props.removeTask}
        />)
      )
    }

    return (
      <div className="list">
        <div className="toolbar">
          <h3>{details.name}</h3>

          <button className="delete" onClick={this.removeList(index)}>
            <span className="fa fa-trash-o" />
          </button>
        </div>

        <ul>
          {tasks}
          <AddTask key={index} list={index} add={this.props.addTask} />
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  index: React.PropTypes.string.isRequired,
  details: React.PropTypes.object.isRequired,
  addTask: React.PropTypes.func.isRequired,
  removeTask: React.PropTypes.func.isRequired,
  removeList: React.PropTypes.func.isRequired,
};

module.exports = List;
