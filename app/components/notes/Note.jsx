import * as firebase from 'firebase';
import moment from 'moment';
import * as config from '../../../firebase.config';

const React = require('react');
const ReactRouter = require('react-router');
const Rebase = require('re-base');

const Link = ReactRouter.Link;
const base = Rebase.createClass(config);

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.remove = index => this.props.remove.bind(null, index);
  }

  render() {
    const { details, index } = this.props;
    const date = moment(details.timestamp).fromNow();

    const currentUser = base.auth().currentUser.uid;
    const isOwner = (details.user === currentUser);

    if (isOwner) {
      return (
        <div className="note">
          <Link className="link" to={`/note/${index}`} >
            <span className="title">{details.title}</span>
            <span className="date">{date}</span>
          </Link>

          <button className="delete" onClick={this.remove(index)}>
            <span className="icon-trash" />
          </button>
        </div>
      );
    }

    return false;
  }
}

Note.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  remove: React.PropTypes.func.isRequired,
};

module.exports = Note;
