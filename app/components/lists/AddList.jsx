const React = require('react');
const ReactDOM = require('react-dom');

class AddList extends React.Component {
  handleSubmit(e) {
    if (e.keyCode === 13) {
      this.props.add(ReactDOM.findDOMNode(this.refs.newItem).value);
      ReactDOM.findDOMNode(this.refs.newItem).value = '';
    }
  }
  render() {
    return (
      <div className="form form-tasks">
        <input type="text"
          ref="newItem"
          placeholder="New Item"
          onKeyDown={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

AddList.propTypes = {
  add: React.PropTypes.func.isRequired,
};

module.exports = AddList;
