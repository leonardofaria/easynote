import * as config from '../../../firebase.config';

const React = require('react');
const ReactDOM = require('react-dom');
const Rebase = require('re-base');
const List = require('./List');
const AddList = require('../lists/AddList');
const Loading = require('../Loading');
const ReactRouter = require('react-router');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.state = {
      lists: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.ref = base.syncState('lists', {
      context: this,
      state: 'lists',
      then() {
        this.setState({ loading: false });
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleAddList(name) {
    const lists = this.state.lists;
    const timestamp = Date.now();
    const user = base.auth().currentUser.uid;
    const tasks = ['task 1', 'task 2'];

    lists[`list-${timestamp}`] = { name, user, tasks };
    this.setState({ lists });
  }

  handleRemoveList(index) {
    if (confirm('Are you sure?')) {
      const lists = this.state.lists;
      lists[index] = null;
      this.setState({ lists });
    }
  }

  handleRemoveTask(list, index) {
    const lists = this.state.lists;
    lists[list].tasks.splice(index);

    this.setState({ lists });
  }

  handleAddTask(list, task) {
    const lists = this.state.lists;

    if (typeof lists[list].tasks === 'object') {
      lists[list].tasks.push(task);
    } else {
      lists[list].tasks = [task];
    }

    this.setState({ lists });
  }

  render() {
    return (
      <div>
        <div className="toolbar main-toolbar">
          <h3>My Lists</h3>
          <AddList add={this.handleAddList.bind(this)} />
        </div>
        {this.state.loading === true ?
          <Loading />
        :
          Object.keys(this.state.lists)
            .map(key =>
              <List
                key={key}
                index={key}
                details={this.state.lists[key]}
                removeList={this.handleRemoveList}
                removeTask={this.handleRemoveTask}
                addTask={this.handleAddTask}
              />)
        }
      </div>
    );
  }
}

module.exports = Lists;
