import ReactHtmlParser from 'react-html-parser';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as config from '../../../firebase.config';

const React = require('react');
const Rebase = require('re-base');
const ReactRouter = require('react-router');
const EditNote = require('../notes/EditNote');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class FullNote extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      note: {},
      loading: true,
      editActive: false,
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`notes/${this.props.params.noteId}`, {
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

  toggleEdit() {
    const editState = !this.state.editActive;
    this.setState({ editActive: !this.state.editActive });
  }

  render() {
    let edit;

    if (this.state.editActive) {
      edit = <EditNote noteId={this.props.params.noteId} />;
    } else {
      edit = ReactHtmlParser(this.state.note.content);
    }

    return (
      <div className="container">
        {this.state.loading === true ?
          <h4 className="text-center"> LOADING... </h4>
        :
          <div>
            <h3><Link to={`/note/${this.props.params.noteId}`} >{this.state.note.title}</Link></h3>
            <button className="pull-right" onClick={this.toggleEdit}>edit</button>

            <ReactCSSTransitionGroup transitionName="edit" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              {edit}
            </ReactCSSTransitionGroup>
          </div>
        }

      </div>
    );
  }
}

FullNote.propTypes = {
  params: React.PropTypes.object.isRequired,
  noteId: React.PropTypes.string.isRequired,
};

module.exports = FullNote;
