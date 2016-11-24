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
    let newNote = null;
    let dashboard = null;
    let loginOrOut;
    let register = null;

    if (this.state.loggedIn) {
      home = <Link to="/dashboard" className="logo">easyNote</Link>;
      newNote = <li><Link to="/notes/new"><div className="icon"><span className="icon-pen" /></div><span>New note</span></Link></li>;
      dashboard = <li><Link to="/dashboard"><div className="icon"><span className="icon-folder" /></div><span>Recent</span></Link></li>;
      loginOrOut = <li className="logout"><Link to="/logout"><div className="icon"><span className="icon-user" /></div><span>Logout</span></Link></li>;
    } else {
      home = <Link to="/" className="logo">easyNote</Link>;
      loginOrOut = <li><Link to="/login"><div className="icon"><span className="icon-user" /></div><span>Login</span></Link></li>;
      register = <li><Link to="/register"><div className="icon"><span className="icon-user" /></div><span>Register</span></Link></li>;
    }

    return (
      <div>
        <aside>
          <nav>
            <ul>
              {newNote}
              {dashboard}
              {register}
              {loginOrOut}
            </ul>
          </nav>
        </aside>

        <main>
          {home}

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
