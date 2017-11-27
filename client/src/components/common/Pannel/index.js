import React from 'react';

const Pannel = ({children, heading}) => (
  <div className="panel-group">
    <div className="panel panel-info">
      <div className="panel-heading">
        {heading}
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  </div>
);

export default Pannel;
