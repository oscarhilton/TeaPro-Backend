import React from 'react';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';

const Categories = () => {
  return (
    <div>
      <h2>Categories</h2>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default Categories;
