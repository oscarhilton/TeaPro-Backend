import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newCategoryTitleChange } from '../actions';

class CategoryForm extends Component {
  handleTitleChange(text) {
    console.log(text.target.value);
    this.props.newCategoryTitleChange(text.target.value);
  }

  handleCreateCategory(e) {
    e.preventDefault();
    console.log('hello');
  }

  render() {
    return (
      <form>
        <input
          placeholder="Category title"
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

export default connect(null, { newCategoryTitleChange })(CategoryForm);
