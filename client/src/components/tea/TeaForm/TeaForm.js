import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newTea } from '../../../actions';

class TeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: '',
        origin: '',
        caffeine: '',
        steeptime: ''
      }
    }
  }

  handleChange(func, event) {
    // if (event.target.value.length > 0) {
    //   func(event.target.value)
    // }
  }

  handleCreateTea(e) {
    e.preventDefault();
    const newTea = this.state.form;
    const catId = this.props.categories.selected._id;

    this.props.newTea(newTea, catId);
  }

  render() {
    const { title, description, origin, caffeine, steeptime } = this.state;
    return (
      <form>
        <input
          placeholder="Tea title"
          value={ title }
          onChange={this.handleChange.bind(this)}
        />
        <br/>
        <textarea
          placeholder="Description"
          value={ description }
          onChange={this.handleChange.bind(this)}
        />
        <br/>
        <input
          placeholder="Origin"
          value={ origin }
          onChange={this.handleChange.bind(this)}
        />
        <br/>
        <select
          value={ caffeine }
          onChange={this.handleChange.bind(this)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <br/>
        <input
          placeholder="Steep Time"
          value={ steeptime }
          onChange={this.handleChange.bind(this)}
        />
        <br/>
        <button
          type="submit"
          className="btn btn-default"
          onClick={this.handleCreateTea.bind(this)}
        >
        Create new tea
        </button>
      </form>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
}

export default connect(mapStateToProps, { newTea })(TeaForm);
