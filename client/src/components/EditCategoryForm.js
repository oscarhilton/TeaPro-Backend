import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectFile from './media/SelectFile';
import {
  editCategory
} from '../actions';

class EditCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        background: '',
        image: ''
      }
    }
  }

  handleChange(event) {
    if (event.target.value.length > 0) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value
        }
      });
    }
  }

  handleSelectFile(event) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        image: event.target.value
      }
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    const { selected } = this.props.categories;
    console.log(selected);
    this.props.editCategory(selected._id, this.state.form);
  }

  render() {
    const { background } = this.state.form;
    console.log(this.props);
    return (
      <form>
        <input
          placeholder="Background colour"
          onChange={this.handleChange.bind(this)}
          name="background"
          value={ background }
        />
        <br/>
        <SelectFile
          onChange={this.handleSelectFile.bind(this)}
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

export default connect(mapStateToProps, { editCategory })(EditCategoryForm);
