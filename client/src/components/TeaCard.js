import React from 'react';

const TeaCard = ({ tea }) => {
  return (
    <div className="Tea">
      <div className="tea_title">
        <span>
          {tea.title}
        </span>
      </div>
      <div className="tea_score">
        <span>
          {tea.score}
        </span>
      </div>
    </div>
  );
};

export default TeaCard;
