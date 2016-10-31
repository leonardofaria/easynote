import React, { Component } from 'react';
import * as firebase from 'firebase';

const Register = React.createClass({
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

    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(this.context.router.replace('/'))
    .catch(this.setState({ error: e.message }));
  },

  render() {
    const errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Register </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          {errors}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  },
});

module.exports = Register;
