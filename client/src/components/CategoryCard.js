import React from 'react';

const TeaCard = ({ category }) => {
  return (
    <div>
      <span>
        {category.title}
      </span>
    </div>
  );
};

export default TeaCard;
