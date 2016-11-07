import * as firebase from 'firebase';

const React = require('react');
const ReactRouter = require('react-router');

const Router = ReactRouter.Router;
const Link = ReactRouter.Link;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (firebase.auth().currentUser !== null),
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.setState({
        loggedIn: (firebaseUser !== null),
      });

      if (firebaseUser) {
        // console.log('Logged IN', firebaseUser);
      } else {
        // console.log('Not logged in');
      }
    });
  }

  render() {
    let home;
    let newNote;
    let dashboard;
    let loginOrOut;
    let register;

    if (this.state.loggedIn) {
      home = <Link to="/dashboard" className="logo"><div className="icon"><span className="fa fa-sticky-note"></span></div><span>NoteAPP</span></Link>;
      newNote = <li><Link to="/notes/new"><div className="icon"><span className="fa fa-file-text-o"></span></div><span>New note</span></Link></li>;
      dashboard = <li><Link to="/dashboard"><div className="icon"><span className="fa fa-folder-open-o"></span></div><span>Recent</span></Link></li>;
      loginOrOut = <li><Link to="/logout"><div className="icon"><span className="fa fa-sign-out"></span></div><span>Logout</span></Link></li>;

      register = null;
    } else {
      home = <Link to="/" className="logo">NoteAPP</Link>;
      newNote = null;
      dashboard = null;
      loginOrOut = <li><Link to="/login"><div className="icon"><span className="fa fa-user"></span></div><span>Login</span></Link></li>;
      register = <li><Link to="/register"><div className="icon"><span className="fa fa-user-plus"></span></div><span>Register</span></Link></li>;

    }
    return (
      <div>
        <aside>
          <nav>
            {home}

            <ul>
              {newNote}
              {dashboard}
              {register}
              {loginOrOut}
            </ul>
          </nav>
        </aside>

        <main>
          {this.props.children}
        </main>

      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.node.isRequired,
};

module.exports = Main;
