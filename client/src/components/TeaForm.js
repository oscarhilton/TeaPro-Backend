import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  newTeaTitleChange,
  newTeaDescriptionChange,
  newTeaOriginChange,
  newTeaCaffeineChange,
  newTeaSteeptimeChange,
  newTea
} from '../actions';

class TeaForm extends Component {
  handleChange(func, event) {
    if (event.target.value.length > 0) {
      func(event.target.value)
    }
  }

  handleCreateTea(e) {
    e.preventDefault();
    const newTea = this.props.categories.formValues.newTea;
    const catId = this.props.categories.selected._id;

    this.props.newTea(newTea, catId);
  }

  render() {
    const { title, description, origin, caffeine, steeptime } = this.props.categories.formValues.newTea;
    return (
      <form>
        <input
          placeholder="Tea title"
          value={ title }
          onChange={this.handleChange.bind(this, this.props.newTeaTitleChange)}
        />
        <br/>
        <textarea
          placeholder="Description"
          value={ description }
          onChange={this.handleChange.bind(this, this.props.newTeaDescriptionChange)}
        />
        <br/>
        <input
          placeholder="Origin"
          value={ origin }
          onChange={this.handleChange.bind(this, this.props.newTeaOriginChange)}
        />
        <br/>
        <select
          value={ caffeine }
          onChange={this.handleChange.bind(this, this.props.newTeaCaffeineChange)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <br/>
        <input
          placeholder="Steep Time"
          value={ steeptime }
          onChange={this.handleChange.bind(this, this.props.newTeaSteeptimeChange)}
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

export default connect(
  mapStateToProps,
  {
    newTeaTitleChange,
    newTeaDescriptionChange,
    newTeaOriginChange,
    newTeaCaffeineChange,
    newTeaSteeptimeChange,
    newTea
  })(TeaForm);
