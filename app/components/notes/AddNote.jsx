import Editor from 'react-medium-editor';
import * as config from '../../../firebase.config';

const React = require('react');
const ReactRouter = require('react-router');
const Rebase = require('re-base');

const base = Rebase.createClass(config);

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      notes: [],
      loading: true,
      text: 'Start your text here...',
    };
  }

  componentDidMount() {
    this.ref = base.syncState('notes', {
      context: this,
      state: 'notes',
    });
  }

  handleSubmit() {
    const title = this.title.value;
    const content = this.state.text;
    const notes = this.state.notes;
    const timestamp = Date.now();
    const user = base.auth().currentUser.uid;

    const note = { title, content, user, timestamp };
    notes[`note-${timestamp}`] = note;
    this.setState({ notes });

    this.context.router.replace(`/note/note-${timestamp}`);
  }

  handleChange(text, medium) {
    this.setState({ text });
  }

  render() {
    return (
      <div className="container flex-container">
        <div className="toolbar main-toolbar">
          <h3>New notes</h3>
        </div>
        <div className="form form-notes">
          <input type="text" ref={(c) => { this.title = c; }} placeholder="Title your note" className="big" />
          <Editor tag="div" text={this.state.text} onChange={this.handleChange} />
          <div className="toolbar secondary-toolbar">
            <button className="btn" onClick={this.handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

AddNote.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = AddNote;
