import React from 'react';
import './style.css';

const TeaCard = ({ tea }) => {
  const background = tea.category ? tea.category.background : '#212121';
  return (
    <div className="tea-card" style={{ background }}>
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
