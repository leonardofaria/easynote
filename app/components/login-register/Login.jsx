import React, { Component } from 'react';
import * as firebase from 'firebase';

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      error: false,
    };
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
    }).catch(function(error) {
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
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          {errors}
          <button type="submit" className="btn btn-primary">Login</button><br />
        </form>
        <button type="button" className="btn btn-primary" onClick={() => this.handleExternalLogin('facebook')}>Login Facebook</button>
      </div>
    );
  },
});

module.exports = Login;
