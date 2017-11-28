import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import EditMood from '../EditMood/';

const MoodCard = ({title, image}) => {
  console.log(title, image);
  const showImage = image ? (<img src={`${image.path}`} alt="{title}" />) : null;
  return (
    <div className="thumbnail">
      {showImage}
      <div className="caption">
        <h5>{title}</h5>
        <EditMood />
      </div>
    </div>
  );
}

MoodCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object
};

export default MoodCard;
