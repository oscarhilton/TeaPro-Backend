import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListComponent } from '../common';
import EditCategoryForm from './EditCategoryForm/';
import { deleteCategory, getCategoryByName } from '../../actions';

class CategoryPage extends Component {
  componentWillMount() {
    this.props.getCategoryByName(this.props.match.params.title);
  }
  render() {
    const { title, teas, background } = this.props.categories.selected;
    return (
      <div className="">
        <h2>{title}</h2>
        <div className="popup-anchor">
          <EditCategoryForm background={background} />
        </div>
        <ListComponent data={teas}>
        </ListComponent>
      </div>
    );
  };
};

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps, { deleteCategory, getCategoryByName })(CategoryPage);
