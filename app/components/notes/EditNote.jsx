import Editor from 'react-medium-editor';
import * as config from '../../../firebase.config';

const React = require('react');
const ReactDOM = require('react-dom');
const Rebase = require('re-base');
const ReactRouter = require('react-router');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class EditNote extends React.Component {
  constructor(props) {
    super(props);
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
    const title = ReactDOM.findDOMNode(this.refs.title).value;
    // const content = ReactDOM.findDOMNode(this.refs.content).value;
    const content = this.state.text;
    // this.props.add(title, content);
    // ReactDOM.findDOMNode(this.refs.newItem).value = '';
    const timestamp = Date.now();
    const currentUser = base.auth().currentUser;

    const note = { title: title, content: content, user: currentUser.uid };
    this.setState({ note: note });
  }

  handleChange(text, medium) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div>
        {this.state.loading === true ?
          <h4 className="text-center"> LOADING... </h4>
        :
          <div className="form form-notes">
            <input type="text" ref="title" defaultValue={this.state.note.title} placeholder="Title your note" className="big" />
            <Editor
              tag="div"
              text={this.state.note.content}
              onChange={this.handleChange.bind(this)}
            />
            <div className="actions">
              <button className="btn" onClick={this.handleSubmit.bind(this)}>Save</button>
            </div>
          </div>
        }

      </div>
    );
  }
}

module.exports = EditNote;
