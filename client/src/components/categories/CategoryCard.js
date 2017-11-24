import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions';

class TeaCard extends Component {
  handleDelete() {
    console.log(this.props.category._id);
    this.props.deleteCategory(this.props.category._id);
  }

  render() {
    const { title } = this.props.category;
    return (
      <div>
        <Link to={`/category/${ title }`}>
          { title }
        </Link>
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
