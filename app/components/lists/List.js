import Task from './Task';
var React = require('react');

class List extends React.Component{
  render(){
    return (
      <div className="col-sm-12">
        <ul className="list-group">
          {Object
            .keys(this.props.list)
            .map(key => <Task key={key} index={key} details={this.props.list[key]} remove={this.props.remove}/>)
          }
        </ul>
      </div>
    )
  }
};

module.exports = List;