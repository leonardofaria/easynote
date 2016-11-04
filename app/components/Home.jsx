import React, { Component } from 'react';

// why this is not a ES6 class: https://goo.gl/1WHVmj
function Home() {
  return (
    <p> This is the Home Page. This route is not protected. </p>
  );
}

module.exports = Home;
