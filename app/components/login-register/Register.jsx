import React, { Component } from 'react';
import * as firebase from 'firebase';

const ReactRouter = require('react-router');

const Link = ReactRouter.Link;

const Register = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      error: false,
    };
  },

  componentWillMount() {
    document.body.classList.add('page-register');
  },

  componentWillUnmount() {
    document.body.classList.remove('page-register');
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
      <div className="text-center">
        <form className="form form-account" onSubmit={this.handleSubmit}>
          <input className="form-control" ref="email" placeholder="Email"/>
          <input ref="pw" type="password" className="form-control" placeholder="Password" />
          {errors}
          <button type="submit" className="btn btn-primary">Register</button>
          <Link to="/login">Login</Link>
        </form>
      </div>
    );
  },
});

module.exports = Register;
