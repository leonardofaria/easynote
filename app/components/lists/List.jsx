import Task from './Task';

const React = require('react');

// why this is not a ES6 class: https://goo.gl/1WHVmj
function List() {
  return (
    <div className="col-sm-12">
      <ul className="list-group">
        {Object
          .keys(this.props.list)
          .map(key => <Task
            key={key}
            index={key}
            details={this.props.list[key]}
            remove={this.props.remove}
          />)
        }
      </ul>
    </div>
  );
}

module.exports = List;
