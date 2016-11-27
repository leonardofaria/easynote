import React, { Component } from 'react';
import * as firebase from 'firebase';

const ReactRouter = require('react-router');

const Link = ReactRouter.Link;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.body.classList.add('page-register');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-register');
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.context.router.replace('/dashboard'))
      .catch(this.setState({ error: e.message }));
  }

  render() {
    const errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
      <div className="text-center">
        <form className="form form-account" onSubmit={this.handleSubmit}>
          {errors}

          <input ref={(c) => { this.email = c; }} className="form-control" placeholder="Email" />
          <input ref={(c) => { this.password = c; }} type="password" className="form-control" placeholder="Password" />

          <button type="submit" className="btn btn-primary">Register</button>
          <Link to="/login">Login</Link>
        </form>
      </div>
    );
  }
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = Register;
