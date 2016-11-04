import React, { Component } from 'react';
import * as firebase from 'firebase';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidMount() {
    firebase.auth().signOut();
    this.setState({ loggedIn: false });
    // this.context.router.replace('/');
  }

  render() {
    return <p>You are now logged out</p>;
  }

}

Logout.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

module.exports = Logout;
