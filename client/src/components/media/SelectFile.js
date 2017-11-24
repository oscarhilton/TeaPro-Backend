import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'bootstrap-select';
import { fetchAllFiles } from '../../actions/uploadActions';

class SelectFile extends Component {
  componentDidMount() {
    this.props.fetchAllFiles();
    $('.selectpicker').selectpicker({
      size: 4
    });
  }

  render() {
    const renderOptions = this.props.media.files.map((file) =>
          <option
            key={file._id}
            value={file._id}
            data-thumbnail={file.path}
          >
            {file.title}
          </option>);
    return (
      <select
        onChange={this.props.onChange}
        className='selectpicker'
      >
        {renderOptions}
      </select>
    );
  };
};

const mapStateToProps = ({ media }) => {
  return { media };
}

export default connect(mapStateToProps, { fetchAllFiles })(SelectFile);
