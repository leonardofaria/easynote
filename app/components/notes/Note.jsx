import moment from 'moment';

const React = require('react');
const ReactRouter = require('react-router');

const Link = ReactRouter.Link;

class Note extends React.Component {
  render() {
    const { details, index } = this.props;
    const date = moment(details.timestamp).fromNow();

    return (
      <div className="note">
        <Link className="link" to={'/note/'+ index} >{ details.title }</Link>
        <span className="date">{date}</span>
        <button className="delete" onClick={this.props.remove.bind(null, index)}>
          <span className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}

Note.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  remove: React.PropTypes.func.isRequired,
};

module.exports = Note;
