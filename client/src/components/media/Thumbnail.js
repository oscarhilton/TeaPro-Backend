import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFile } from '../../actions/uploadActions';

class Thumbnail extends Component {
  handleDelete() {
    this.props.deleteFile(this.props.imageData._id)
  }

  render() {
    const { _id, title, path } = this.props.imageData;
    return (
      <div className="thumbnail">
        <img src={`/uploads/${title}`} />
        <span>{title}</span>
        <button
          type="button"
          onClick={this.handleDelete.bind(this)}
        >
          delete
        </button>
      </div>
    );
  }
};

export default connect(null, { deleteFile })(Thumbnail);
