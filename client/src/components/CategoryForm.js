import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newCategoryTitleChange, newCategory } from '../actions';

class CategoryForm extends Component {
  handleTitleChange(text) {
    this.props.newCategoryTitleChange(text.target.value);
  }

  handleCreateCategory(e) {
    e.preventDefault();
    if (this.props.categories.formValues.newCategory.title.length > 0) {
      this.props.newCategory(this.props.categories.formValues.newCategory);
      this.props.newCategoryTitleChange('');
    }
  }

  render() {
    return (
      <form>
        <input
          placeholder="Category title"
          value={this.props.categories.formValues.newCategory.title}
          onChange={this.handleTitleChange.bind(this)}
        />
        <button
          type="submit"
          className="btn btn-default"
          onClick={this.handleCreateCategory.bind(this)}
        >
        Create new category
        </button>
      </form>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
}

export default connect(mapStateToProps, { newCategoryTitleChange, newCategory })(CategoryForm);
