import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class MoodsForm extends Component {
  handleTitleChange(text) {
    // this.props.newCategoryTitleChange(text.target.value);
  }

  handleCreateMood(e) {
    e.preventDefault();
    // if (this.props.categories.formValues.newCategory.title.length > 0) {
    //   this.props.newCategory(this.props.categories.formValues.newCategory);
    //   this.props.newCategoryTitleChange('');
    // }
  }

  render() {
    return (
      <form>
        <input
          placeholder="Mood title"
          onChange={this.handleTitleChange.bind(this)}
        />
        <textarea
          placeholder="description"
        />
        <button
          type="submit"
          className="btn btn-default"
          onClick={this.handleCreateMood.bind(this)}
        >
        Create new mood
        </button>
      </form>
    );
  };
};

const mapStateToProps = ({ moods }) => {
  return { moods };
}

export default connect(mapStateToProps)(MoodsForm);
