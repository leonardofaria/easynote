import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as config from '../../../firebase.config';

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
    this.handleAddList = this.handleAddList.bind(this);
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
      asArray: true,
      then() {
        const currentUser = base.auth().currentUser;
        this.setState({ loading: false, currentUser: currentUser.uid });
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

    lists[`list-${timestamp}`] = { name, user };
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
    const lists = this.state.lists.map((list, i) => {
      if (this.state.currentUser === list.user) {
        return (
          <List
            key={list.key}
            index={i}
            details={list}
            removeList={this.handleRemoveList}
            removeTask={this.handleRemoveTask}
            addTask={this.handleAddTask}
          />
        );
      }
      return false;
    });

    return (
      <div>
        <div className="toolbar main-toolbar">
          <h3>My Lists</h3>
          <AddList add={this.handleAddList} />
        </div>
        <div className="lists">
          {this.state.loading === true ?
            <Loading />
          :
            <ReactCSSTransitionGroup
              transitionName="list-animation"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {lists}
            </ReactCSSTransitionGroup>
          }
        </div>
      </div>
    );
  }
}

module.exports = Lists;
