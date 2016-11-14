import * as config from '../../../firebase.config';

const React = require('react');
const ReactDOM = require('react-dom');
const Rebase = require('re-base');
const Note = require('./Note');
const AddNote = require('../notes/AddNote');
const Loading = require('../Loading');
const ReactRouter = require('react-router');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
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

  handleRemoveNote(index) {
    if (confirm('Are you sure?')) {
      const notes = this.state.notes;
      notes[index] = null;
      this.setState({ notes });
    }
  }

  render() {
    return (
      <div>
        <div className="toolbar main-toolbar">
          <h3>My Notes</h3>
          <Link to="/notes/new" className="btn">New note</Link>
        </div>
        {this.state.loading === true ?
          <Loading />
        :
          Object.keys(this.state.notes)
            .map(key =>
              <Note
                key={key}
                index={key}
                details={this.state.notes[key]}
                remove={this.handleRemoveNote}
              />)
        }
      </div>
    );
  }
}

module.exports = Notes;
