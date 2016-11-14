import * as config from '../../../firebase.config';

const React = require('react');
const ReactDOM = require('react-dom');
const Rebase = require('re-base');
const Lists = require('../lists/Lists');
const Notes = require('../notes/Notes');
const Loading = require('../Loading');

const base = Rebase.createClass(config);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.ref = base.syncState('lists', {
      context: this,
      state: 'list',
      then() {
        this.setState({ loading: false });
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleAddItem(newItem) {
    const list = this.state.list;
    const timestamp = Date.now();
    const currentUser = base.auth().currentUser;
    list[`item-${timestamp}`] = { item: newItem, user: currentUser.uid };
    this.setState({ list });
  }

  handleRemoveItem(index) {
    const list = this.state.list;
    list[index] = null;
    this.setState({ list });
  }

  render() {
    return (
      <div>
        <div className="notes-container">
          <Notes />
        </div>
        <div className="tasks-container">
          <Lists />
        </div>
      </div>
    );
  }
}

module.exports = Dashboard;
