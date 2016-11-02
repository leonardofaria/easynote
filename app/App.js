import style from '../styles/app.scss';

const React = require('react');
const ReactDOM = require('react-dom');
const routes = require('./config/routes');

ReactDOM.render(routes, document.getElementById('app'));
