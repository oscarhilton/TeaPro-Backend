import React, { Component } from 'react';

class ImageUpload extends Component {
  render() {
    return (
      <form>
        <input name="myFile" type="file" />
        <button
          type="submit"
          className="btn btn-default"
        >
        Upload image
        </button>
      </form>
    );
  };
}

export { ImageUpload };
