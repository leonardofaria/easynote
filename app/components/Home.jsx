const React = require('react');

const Home = React.createClass({
  render() {
    return <p> This is the Home Page. This route is not protected. </p>;
  },
});

module.exports = Home;
