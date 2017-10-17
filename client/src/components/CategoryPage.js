import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListComponent } from './common';
import TeaForm from './TeaForm';
import { deleteCategory, getCategoryByName } from '../actions';

class CategoryPage extends Component {
  componentWillMount() {
    this.props.getCategoryByName(this.props.match.params.name);
  }
  render() {
    const { title, teas } = this.props.categories.selected;
    return (
      <div>
        <h2>{title}</h2>
        <TeaForm />
        <ListComponent data={teas} />
      </div>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps, { deleteCategory, getCategoryByName })(CategoryPage);
