import React, { Component } from 'react';
import * as firebase from 'firebase';

const Logout = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      error: false,
    };
  },

  componentDidMount() {
    firebase.auth().signOut();
    this.setState({ loggedIn: false });
    // this.context.router.replace('/');
  },

  render() {
    return <p>You are now logged out</p>;
  },

});

module.exports = Logout;
