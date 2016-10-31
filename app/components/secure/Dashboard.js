var React = require('react');
var ReactDOM = require('react-dom');
var Rebase = require('re-base');
var List = require('../lists/List');
var AddItem = require('../lists/AddItem');
import * as config from '../../../firebase.config.js';

var base = Rebase.createClass(config);

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  }

  componentDidMount(){
    this.ref = base.syncState('lists', {
      context: this,
      state: 'list',
      then(){
        this.setState({loading: false});
      }
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  handleAddItem(newItem){
    var list = this.state.list;
    var timestamp = Date.now();
    var currentUser = base.auth().currentUser;
    list[`item-${timestamp}`] = { item: newItem, user: currentUser.uid };
    this.setState({ list: list });
  }

  handleRemoveItem(index){
    const list = this.state.list;
    list[index] = null;
    this.setState({ list: list });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-offset-3">
            <div className="col-sm-12">
              <h3 className="text-center">My Tasks</h3>
              <AddItem add={this.handleAddItem.bind(this)}/>
              {this.state.loading === true ? <h4 className="text-center"> LOADING... </h4> : <List list={this.state.list} remove={this.handleRemoveItem.bind(this)}/>}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

module.exports = Dashboard;