import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllFiles } from '../../actions/uploadActions';

class SelectFile extends Component {
  componentDidMount() {
    this.props.fetchAllFiles();
  }

  render() {
    const renderOptions = this.props.media.files.map((file) =>
          <option key={file._id} value={file._id}>{file.title}</option>);
    return (
      <select onChange={this.props.onChange}>
        {renderOptions}
      </select>
    );
  };
};

const mapStateToProps = ({ media }) => {
  return { media };
}

export default connect(mapStateToProps, { fetchAllFiles })(SelectFile);
