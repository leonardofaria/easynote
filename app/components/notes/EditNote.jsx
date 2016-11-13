import Editor from 'react-medium-editor';
import * as config from '../../../firebase.config';

const React = require('react');
const ReactRouter = require('react-router');
const Rebase = require('re-base');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      note: {},
      loading: true,
      text: '',
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`notes/${this.props.noteId}`, {
      context: this,
      state: 'note',
      then() {
        this.setState({ loading: false });
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleSubmit() {
    const title = this.title.value;
    const content = this.state.text;
    const notes = this.state.notes;
    const timestamp = Date.now();
    const user = base.auth().currentUser.uid;

    const note = { title, content, user, timestamp };
    this.setState({ note });
  }

  handleChange(text, medium) {
    this.setState({ text });
  }

  render() {
    return (
      <div>
        {this.state.loading === true ?
          <h4 className="text-center"> LOADING... </h4>
        :
          <div className="form form-notes">
            <input type="text" ref={(c) => { this.title = c; }} placeholder="Title your note" className="big" defaultValue={this.state.note.title} />
            <Editor tag="div" text={this.state.note.content} onChange={this.handleChange} />
            <div className="actions">
              <button className="btn" onClick={this.handleSubmit}>Update</button>
            </div>
          </div>
        }

      </div>
    );
  }
}

EditNote.propTypes = {
  noteId: React.PropTypes.string.isRequired,
};

module.exports = EditNote;
