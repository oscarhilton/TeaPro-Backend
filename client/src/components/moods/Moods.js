import React, { Component } from 'react';
import MoodsForm from './MoodsForm';
import { ImageUpload } from '../common';

class Moods extends Component {
  render() {
    return (
      <div>
        Hello there from moods.
        <MoodsForm />
        <ImageUpload />
      </div>
    );
  };
}

export default Moods;
