const React = require('react');
const ReactRouter = require('react-router');
const Main = require('../components/Main');
const Register = require('../components/login-register/Register');
const Login = require('../components/login-register/Login');
const Logout = require('../components/login-register/Logout');
const Dashboard = require('../components/secure/Dashboard');
const Home = require('../components/Home');
const requireAuth = require('../utils/authenticated');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const hashHistory = ReactRouter.hashHistory;
const IndexRoute = ReactRouter.IndexRoute;

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="register" component={Register} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
);

module.exports = routes;
