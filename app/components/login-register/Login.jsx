import React, { Component } from 'react';
import * as firebase from 'firebase';

const ReactRouter = require('react-router');

const Link = ReactRouter.Link;

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      error: false,
    };
  },

  componentWillMount() {
    document.body.classList.add('page-login');
  },

  componentWillUnmount() {
    document.body.classList.remove('page-login');
  },

  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const pw = this.refs.pw.value;
    const self = this;

    const auth = firebase.auth().signInWithEmailAndPassword(email, pw).then(function(result) {
      const location = self.props.location;
      if (location.state && location.state.nextPathname) {
        self.context.router.replace(location.state.nextPathname);
      } else {
        self.context.router.replace('/dashboard');
      }
      // User signed in!
      // console.log('User signed in!');
      // var uid = result.user.uid;
    }).catch(error => {
      this.setState({ error: error });
    });
  },

  handleExternalLogin(provider) {
    const fb = new firebase.auth.FacebookAuthProvider();
    const self = this;

    const auth = firebase.auth().signInWithPopup(fb).then(function(result) {
      const location = self.props.location;
      if (location.state && location.state.nextPathname) {
        self.context.router.replace(location.state.nextPathname);
      } else {
        self.context.router.replace('/dashboard');
      }
      // User signed in!
      // console.log('User signed in!');
      // var uid = result.user.uid;
    }).catch(function(error) {
      this.setState({ error: error });
    });
  },

  render() {
    const errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
      <div className="text-center">
        <h1>Logo</h1>
        <form className="form form-account" onSubmit={this.handleSubmit}>
          <input className="form-control" ref="email" placeholder="Email" />
          <input ref="pw" type="password" className="form-control" placeholder="Password" />
          {errors}
          <button type="submit" className="btn btn-primary">Login</button><br />

          <button type="button" className="btn btn-facebook" onClick={() => this.handleExternalLogin('facebook')}>Login Facebook</button>
        </form>

        <Link to="/register">Register</Link>
      </div>
    );
  },
});

module.exports = Login;
