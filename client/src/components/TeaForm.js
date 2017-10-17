import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newTeaTitleChange, newTea } from '../actions';

class TeaForm extends Component {
  handleTitleChange(text) {
    if (text.target.value.length > 0){
      this.props.newTeaTitleChange(text.target.value);
    }
  }

  handleCreateTea(e) {
    e.preventDefault();
    const newTea = this.props.categories.formValues.newTea;
    const catId = this.props.categories.selected._id;
    console.log('newTea', newTea);
    this.props.newTea(newTea, catId);
    this.props.newTeaTitleChange('');
  }

  render() {
    console.log(this.props.categories.formValues);
    return (
      <form>
      <input
        placeholder="Tea title"
        value={this.props.categories.formValues.newTea.title}
        onChange={this.handleTitleChange.bind(this)}
      />
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

export default connect(mapStateToProps, { newTeaTitleChange, newTea })(TeaForm);
