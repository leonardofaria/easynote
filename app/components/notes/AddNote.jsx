import Editor from 'react-medium-editor';
import * as config from '../../../firebase.config';

const React = require('react');
const ReactDOM = require('react-dom');
const Rebase = require('re-base');

const base = Rebase.createClass(config);

class AddNote extends React.Component {
  constructor(props) {
    super(props);
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
    const title = ReactDOM.findDOMNode(this.refs.title).value;
    // const content = ReactDOM.findDOMNode(this.refs.content).value;
    const content = this.state.text;
    // this.props.add(title, content);
    // ReactDOM.findDOMNode(this.refs.newItem).value = '';

    const notes = this.state.notes;
    const timestamp = Date.now();
    const currentUser = base.auth().currentUser;
    notes[`note-${timestamp}`] = { title: title, content: content, user: currentUser.uid };
    this.setState({ notes: notes });
  }

  handleChange(text, medium) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div className="container flex-container">
        <h3>My notes</h3>

        <div className="form form-notes">
          <input type="text" ref="title" placeholder="Title your note" className="big" />
          <Editor
            tag="div"
            text={this.state.text}
            onChange={this.handleChange.bind(this)}
          />
          <div className="actions">
            <button className="btn" onClick={this.handleSubmit.bind(this)}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

AddNote.propTypes = {
  // add: React.PropTypes.func.isRequired,
};

module.exports = AddNote;
