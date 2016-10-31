var React = require('react');

var Dashboard = React.createClass({
  render: function(){
    console.log('Dashboard called');
    return <p> DASHBOARD (A Secure Route) </p>
  }
});

module.exports = Dashboard;