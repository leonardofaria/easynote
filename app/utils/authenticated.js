import React, { Component } from 'react';
import _ from 'lodash';
import * as config from '../../firebase.config';

const Rebase = require('re-base');

const firebase = Rebase.createClass(config);

function requireAuth(nextState, replace) {
  const browserStorage = (typeof window.localStorage === 'undefined') ?
    null : window.localStorage;
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
