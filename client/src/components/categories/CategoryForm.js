import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newCategory } from '../../actions';
import Pannel from '../common/Pannel';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: ''
      },
      form: {
        title: ''
      }
    }
  }

  handleTitleChange(text) {
    this.setState({
      form: {
        title: text.target.value
      }
    });
  }

  handleCreateCategory(e) {
    e.preventDefault();
    if (this.state.form['title'].length > 0) {
      this.props.newCategory(this.state);
      this.setState({
        message: {
          type: 'Success',
          text: 'Category successfully added!'
        },
        form: {
          title: '',
        }
      })
    }
  }

  renderMessage() {
    const { message } = this.state;
    if (message['text'].length > 0) {
      return (
        <div className={'alert alert-' + message.type.toLowerCase()}>
          <strong>{message.type}!</strong> {message.text}
        </div>
      );
    }
  }

  render() {
    return (
      <Pannel>
        <form>
          <div className="form-group">
            <label for="category-name">New category name</label>
            <input
              id="category-name"
              placeholder="Category title"
              value={this.state.form.title}
              onChange={this.handleTitleChange.bind(this)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleCreateCategory.bind(this)}
            >
            Create new category
            </button>
            {this.renderMessage()}
          </div>
        </form>
      </Pannel>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
}

export default connect(mapStateToProps, { newCategory })(CategoryForm);
