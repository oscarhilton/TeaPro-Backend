import React, { Component } from 'react';
import UploadFile from '../media/UploadFile';
import { ImageUpload } from '../common';

class Moods extends Component {
  render() {
    return (
      <div>
        <h2>New Mood</h2>
        <UploadFile />
      </div>
    );
  };
}

export default Moods;
