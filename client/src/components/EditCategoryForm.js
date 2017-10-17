import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editCategoryBackgroundChange,
  editCategory
} from '../actions';

class EditCategoryForm extends Component {
  handleChange(func, event) {
    if (event.target.value.length > 0) {
      func(event.target.value)
    }
  }

  handleUpdate(e) {
    e.preventDefault();
    const { formValues, selected } = this.props.categories;
    this.props.editCategory(selected._id, formValues.editCategory);
  }

  render() {
    const { background } = this.props.categories.formValues.editCategory;
    return (
      <form>
        <input
          placeholder="Background colour"
          onChange={this.handleChange.bind(this, this.props.editCategoryBackgroundChange)}
          value={ background }
        />
        <br/>
        <button
          type="submit"
          className="btn btn-default"
          onClick={this.handleUpdate.bind(this)}
        >
        Update Category
        </button>
      </form>
    );
  };
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps, { editCategoryBackgroundChange, editCategory })(EditCategoryForm);
