import * as config from '../../../firebase.config';

const React = require('react');
const ReactDOM = require('react-dom');
const Rebase = require('re-base');
const Note = require('./Note');
const AddNote = require('../notes/AddNote');

const base = Rebase.createClass(config);

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.ref = base.syncState('notes', {
      context: this,
      state: 'notes',
      then() {
        this.setState({ loading: false });
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleAddNote(title, content) {
    const notes = this.state.notes;
    const timestamp = Date.now();
    const currentUser = base.auth().currentUser;
    notes[`note-${timestamp}`] = { title: title, content: content, user: currentUser.uid };
    this.setState({ notes: notes });
  }

  handleRemoveNote(index) {
    const notes = this.state.notes;
    notes[index] = null;
    this.setState({ notes: notes });
  }

  render() {
    return (
      <div>
        <h3>My Notes</h3>
        {this.state.loading === true ?
          <h4 className="text-center">Loading my notes...</h4>
        :
          Object
            .keys(this.state.notes)
            .map(key => <Note key={key} index={key} details={this.state.notes[key]} remove={this.handleRemoveNote.bind(this)} />)
        }
      </div>
    );
  }
}

module.exports = Notes;
