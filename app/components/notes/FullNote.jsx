import reactHtmlParser from 'react-html-parser';
import * as config from '../../../firebase.config';

const React = require('react');
const Rebase = require('re-base');
const ReactRouter = require('react-router');
const EditNote = require('./EditNote');
const Modal = require('../Modal');
const Loading = require('../Loading');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class FullNote extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      note: {},
      loading: true,
      isModalOpen: false,
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

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div className="container">
        {this.state.loading === true ?
          <Loading />
        :
        <div>
          <div className="toolbar main-toolbar">
            <h3><Link to={`/note/${this.props.params.noteId}`} >{this.state.note.title}</Link></h3>
            <button onClick={this.toggleModal} className="btn">Edit</button>
          </div>

          {reactHtmlParser(this.state.note.content)}

          <Modal
            isOpen={this.state.isModalOpen}
            transitionName="modal-anim"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className="toolbar">
              <h3>Edit</h3>
              <button onClick={this.toggleModal} className="btn">Close</button>
            </div>

            <div className="body">
              <EditNote noteId={this.props.params.noteId} />
            </div>
          </Modal>
        </div>
        }

      </div>
    );
  }
}

FullNote.propTypes = {
  params: React.PropTypes.object.isRequired,
};

module.exports = FullNote;
