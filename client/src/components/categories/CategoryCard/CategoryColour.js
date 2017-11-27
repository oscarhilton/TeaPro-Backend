import React from 'react';

const CategoryColour = ({ background }) => (
  <div className="category-background-label" style={{ background }}>
    <span className="category-background-label-span">{background}</span>
  </div>
);

export default CategoryColour;
