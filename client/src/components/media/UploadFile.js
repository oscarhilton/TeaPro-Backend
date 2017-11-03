import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadFile } from '../../actions/uploadActions';

class UploadFile extends Component {
  handleFileUpload(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    this.props.uploadFile(data);
  }

  render() {
    return (
      <input
        name="file"
        type="file"
        onChange={this.handleFileUpload.bind(this)}
      />
    );
  };
};

export default connect(null, { uploadFile })(UploadFile);
