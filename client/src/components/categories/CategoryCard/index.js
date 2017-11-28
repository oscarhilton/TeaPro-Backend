import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import { deleteCategory } from '../../../actions';

import EditCategoryForm from '../EditCategoryForm/';
import CategoryColour from './CategoryColour';

class TeaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false
    };
  }

  handleDelete() {
    console.log(this.props.category._id);
    this.props.deleteCategory(this.props.category._id);
  }

  handleEditButton() {
    const current = this.state.editOpen;
    this.setState({ editOpen: !current });
    console.log(current);
  }

  renderEditPopup() {
    if (this.state.editOpen) {
      return (
        <div className="edit-category-popup">
          <EditCategoryForm />
        </div>
      );
    }
    return null;
  }

  render() {
    const { title, background } = this.props.category;
    return (
      <div>
        <div className="pull-left">
          <Link to={`/category/${ title }`}>
            { title }
          </Link>
        </div>
        <div className="pull-right">
          <CategoryColour background={background} />
        </div>
        <div className="pull-right">
          <button
            className="btn btn-default"
            onClick={this.handleEditButton.bind(this)}
          >
            Edit
          </button>
          <div className="popup-anchor">
            {this.renderEditPopup()}
          </div>
        </div>
        <button
          className="pull-right btn btn-default"
          onClick={this.handleDelete.bind(this)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default connect(null, { deleteCategory })(TeaCard);
