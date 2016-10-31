import React, { Component } from 'react';
// import * as firebase from 'firebase';
import _ from 'lodash';
import * as config from '../../firebase.config';
// firebase.initializeApp(config);
const Rebase = require('re-base');
const firebase = Rebase.createClass(config);

function requireAuth(nextState, replace) {
  const browserStorage = (typeof localStorage === 'undefined') ?
    null : localStorage;
  if (browserStorage) {
    if (!firebase.auth().currentUser) {
      let hasBrowserStorageUser = false;
      _.forEach(_.keys(browserStorage), (d) => {
        if (d.startsWith('firebase:authUser')) {
          hasBrowserStorageUser = true;
        }
      });
      if (!hasBrowserStorageUser) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname },
        });
      }
    }
  } else {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname },
        });
      }
    });
  }
}

module.exports = requireAuth;
