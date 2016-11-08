import * as config from '../../../firebase.config';
import Editor from 'react-medium-editor';

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
      state: 'notes'
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
      <div className="container">
        <h3>My notes</h3>

        <div className="form form-notes">
          <input type="text" ref="title" placeholder="Title your note" className="big" />
          <textarea ref="content" className="hide" placeholder="Start your text here..."></textarea>

          <Editor
            tag="pre"
            text={this.state.text}
            onChange={this.handleChange.bind(this)}
          />
          <button onClick={this.handleSubmit.bind(this)}>Save</button>
        </div>
      </div>
    );
  }
}

AddNote.propTypes = {
  // add: React.PropTypes.func.isRequired,
};

module.exports = AddNote;
