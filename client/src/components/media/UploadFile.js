import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadFile } from '../../actions/uploadActions';

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.prepareUpload = this.prepareUpload.bind(this);
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    if (this.state.file !== null) {
      this.prepareUpload(this.state.file);
    }
  }
  onChange(e) {
    this.setState({file:e.target.files[0]});
  }
  prepareUpload(file){
    const formData = new FormData();
    formData.append('file',file)
    this.props.uploadFile(formData);
    this.setState({file: null});
  }
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          name="file"
          type="file"
          onChange={this.onChange}
        />
        <button type="submit">Upload</button>
      </form>
    );
  };
};

export default connect(null, { uploadFile })(UploadFile);
