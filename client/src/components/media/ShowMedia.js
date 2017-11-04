import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadFile from './UploadFile';
import Thumbnail from './Thumbnail';
import { ImageUpload } from '../common';
import { fetchAllFiles } from '../../actions/uploadActions'

class ShowMedia extends Component {
  componentDidMount() {
    this.props.fetchAllFiles();
  }

  render() {
    const thumbnails = this.props.media.files.map( (file) => <Thumbnail key={file._id} imageData={file} />);
    return (
      <div>
        <h2>Media</h2>
        <UploadFile />
        {thumbnails}
      </div>
    );
  };
}

const mapStateToProps = ({ media }) => {
  return { media };
}

export default connect(mapStateToProps, { fetchAllFiles })(ShowMedia);
