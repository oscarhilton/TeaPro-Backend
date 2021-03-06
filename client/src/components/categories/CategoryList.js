import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryCard from './CategoryCard/';

class List extends Component {
  render() {
    console.log(this.props.categories);
    return (
      <ul>
        {Object.values(this.props.categories.list).map(category =>
          <li className="list-group-item" style={{ height: 50 }} key={category.title}>
            <CategoryCard category={category} />
          </li>
        )}
      </ul>
    )
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(List);
