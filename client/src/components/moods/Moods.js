import React, { Component } from 'react';
import MoodsForm from './MoodsForm';

class Moods extends Component {
  render() {
    return (
      <div>
        <h2>New Mood</h2>
        <MoodsForm />
      </div>
    );
  };
}

export default Moods;
