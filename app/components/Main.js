var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
import * as firebase from 'firebase';

var Main = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: (null !== firebase.auth().currentUser)
    }
  },

  componentWillMount: function() {
    firebase.auth().onAuthStateChanged(firebaseUser => {

      this.setState({
        loggedIn: (null !== firebaseUser)
      })

      if (firebaseUser) {
        console.log("Logged IN", firebaseUser);
      } else {
        console.log('Not logged in');
      }
    });
  },

  render: function() {
    var loginOrOut;
    var register;
    if (this.state.loggedIn) {
      loginOrOut = <li><Link to="/logout">Logout</Link></li>;
      register = null
    } else {
      loginOrOut = <li><Link to="/login">Login</Link></li>;
      register = <li><Link to="/register">Register</Link></li>;
    }
    return (
      <span>
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="navbar-inner">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">NoteAPP</Link>
              </div>

              <div class="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/dashboard">Dashboard</Link></li>
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
    )
  }
});

module.exports = Main;
