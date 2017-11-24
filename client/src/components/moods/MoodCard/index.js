import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import EditMood from '../EditMood/';

const MoodCard = ({title, image}) => {
  console.log(title, image);
  const showImage = image ? (<img src={`${image.path}`} />) : null;
  return (
    <div className="container">
      <div className="title"><p>{title}</p></div>
      <div className="image">{showImage}</div>
      <EditMood />
    </div>
  );
}

MoodCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object
};

export default MoodCard;
