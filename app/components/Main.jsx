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

  // getInitialState() {
  //   return {
  //     loggedIn: (firebase.auth().currentUser !== null),
  //   };
  // }

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
    let loginOrOut;
    let register;
    let home;

    if (this.state.loggedIn) {
      loginOrOut = <li><Link to="/logout">Logout</Link></li>;
      register = null;
      home = <Link to="/dashboard" className="navbar-brand">NoteAPP</Link>;
    } else {
      loginOrOut = <li><Link to="/login">Login</Link></li>;
      register = <li><Link to="/register">Register</Link></li>;
      home = <Link to="/" className="navbar-brand">NoteAPP</Link>;
    }
    return (
      <span>
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="navbar-inner">
            <div className="container">
              <div className="navbar-header">
                {home}
              </div>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  {register}
                  {loginOrOut}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </span>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.node.isRequired,
};

module.exports = Main;
