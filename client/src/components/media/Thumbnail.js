import React from 'react';

const Thumbnail = (props) => {
  const { title, path } = props.imageData;
  console.log(props.imageData);
  return (
    <div className="thumbnail">
      <img src={`/uploads/${title}`} />
      <span>{title}</span>
    </div>
  );
};

export default Thumbnail;
