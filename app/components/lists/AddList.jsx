const React = require('react');
const ReactDOM = require('react-dom');

class AddList extends React.Component {
  handleAdd(e) {
    let name = window.prompt('What is the name of the list?', 'Todo');

    if (name !== '') {
      this.props.add(name);
    }
  }

  render() {
    return (
      <a className="btn" onClick={this.handleAdd.bind(this)}>+</a>
    );
  }
}

AddList.propTypes = {
  add: React.PropTypes.func.isRequired,
};

module.exports = AddList;
