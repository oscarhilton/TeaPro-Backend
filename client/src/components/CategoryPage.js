import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCategory, getCategoryByName } from '../actions';

class CategoryPage extends Component {
  componentWillMount() {
    this.props.getCategoryByName(this.props.match.params.name);
  }
  render() {
    console.log(this.props.categories);
    const { title } = this.props.categories.selected;
    return (
      <div><h2>{title}</h2></div>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps, { deleteCategory, getCategoryByName })(CategoryPage);
