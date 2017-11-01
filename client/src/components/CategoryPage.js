import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListComponent } from './common';
import TeaForm from './TeaForm';
import EditCategoryForm from './EditCategoryForm';
import { deleteCategory, getCategoryByName } from '../actions';

class CategoryPage extends Component {
  componentWillMount() {
    this.props.getCategoryByName(this.props.match.params.title);
  }
  render() {
    const { title, teas } = this.props.categories.selected;
    return (
      <div className="container">
        <h2>{title}</h2>
        <div className="row">
          <div className="col">
            <EditCategoryForm />
          </div>
          <div className="col">
            <TeaForm />
          </div>
        </div>
        <ListComponent data={teas} />
      </div>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps, { deleteCategory, getCategoryByName })(CategoryPage);
