import React, { Component } from 'react';
import * as firebase from 'firebase';

const ReactRouter = require('react-router');

const Link = ReactRouter.Link;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.body.classList.add('page-login');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-login');
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      const location = this.props.location;

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname);
      } else {
        this.context.router.replace('/dashboard');
      }
      // User signed in!
      // console.log('User signed in!');
      // var uid = result.user.uid;
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  handleExternalLogin(provider) {
    const fb = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(fb).then((result) => {
      const location = this.props.location;

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname);
      } else {
        this.context.router.replace('/dashboard');
      }
      // User signed in!
      // console.log('User signed in!');
      // var uid = result.user.uid;
    }).catch((error) => {
      this.setState({ error: error.message });
    });
  }

  render() {
    const errors = this.state.error ? <p> {this.state.error} </p> : '';

    return (
      <div className="text-center">
        <form className="form form-account" onSubmit={this.handleSubmit}>
          {errors}

          <input ref={(c) => { this.email = c; }} className="form-control" placeholder="Email" />
          <input ref={(c) => { this.password = c; }} type="password" className="form-control" placeholder="Password" />

          <button type="submit" className="btn btn-primary">Login</button><br />
          <button type="button" className="btn btn-facebook" onClick={() => this.handleExternalLogin('facebook')}>Login Facebook</button>

          <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  location: React.PropTypes.object.isRequired,
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = Login;
