import React from 'react';

import './style.css';

const Button = ({children, onClick}) => (
  <button
    className="btn btn-default"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
