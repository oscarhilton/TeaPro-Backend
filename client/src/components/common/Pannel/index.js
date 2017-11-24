import React from 'react';

const Pannel = ({children}) => (
  <div className="panel-group">
    <div className="panel panel-default">
      <div className="panel-body">
        {children}
      </div>
    </div>
  </div>
);

export default Pannel;
