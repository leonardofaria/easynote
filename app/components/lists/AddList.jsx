const React = require('react');
const ReactDOM = require('react-dom');

class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    const name = window.prompt('What is the name of the list?', 'Todo');

    if (name !== '' && name !== null) {
      this.props.add(name);
    }
  }

  render() {
    return (
      <button className="btn" onClick={this.handleAdd}>+</button>
    );
  }
}

AddList.propTypes = {
  add: React.PropTypes.func.isRequired,
};

module.exports = AddList;
