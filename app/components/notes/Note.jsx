const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

class Note extends React.Component {
  render() {
    const { details, index } = this.props;

    return (
      <div>
        <Link to={'/note/'+ index } >{ details.title }</Link>
        <button onClick={this.props.remove.bind(null, index)}>Delete</button>
      </div>
    );

  }
}

module.exports = Note;
