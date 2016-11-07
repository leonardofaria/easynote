import * as config from '../../../firebase.config';

const React = require('react');
const Rebase = require('re-base');
const ReactRouter = require('react-router');

const base = Rebase.createClass(config);
const Link = ReactRouter.Link;

class FullNote extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      note: {},
      loading: true
    };
  }

  componentWillMount(){
    this.ref = base.syncState(`notes/${this.props.params.noteId}`, {
      context: this,
      state: 'note',
      then() {
        this.setState({loading: false});
      }
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div>
        {this.state.loading === true ?
          <h4 className="text-center"> LOADING... </h4>
        :
          <div>
            <h2><Link to={'/note/' + this.props.params.noteId} >{this.state.note.title}</Link></h2>
            <div>{this.state.note.content}</div>
          </div>
        }

      </div>
    );
  }
}

module.exports = FullNote;
