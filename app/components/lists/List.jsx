import Task from './Task';

const React = require('react');
const AddTask = require('../lists/AddTask');

class List extends React.Component {
  constructor(props) {
    super(props);
    this.removeList = index => this.props.removeList.bind(null, index);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = { active: false };
  }

  toggleClass() {
    this.setState({ active: !this.state.active });
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
      );
    }

    let className = this.state.active ? 'active' : '';
    className += ' list';

    return (
      <div className={className}>
        <div className="toolbar">
          <h3 onClick={this.toggleClass}>{details.name}</h3>

          <button className="delete" onClick={this.removeList(index)}>
            <span className="icon-trash" />
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
  index: React.PropTypes.number.isRequired,
  details: React.PropTypes.object.isRequired,
  addTask: React.PropTypes.func.isRequired,
  removeTask: React.PropTypes.func.isRequired,
  removeList: React.PropTypes.func.isRequired,
};

module.exports = List;
