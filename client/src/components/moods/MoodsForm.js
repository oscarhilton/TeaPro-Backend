import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMood } from '../../actions/moodsActions';

class MoodsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: '',
        image: '',
        imageData: {}
      }
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    });
  }

  handleFileUpload(event) {
    // this.setState({ form: { imageData: event.target.files[0] } });
    // console.log(this.state);
    console.log('hi');
    const data = new FormData();
    data.append('thumbnail', event.target.files[0]);
    data.append('name', this.state.title);
    // this.setState({ form: { imageData: data } });
    if (this.state.form.title.length > -1) {
      this.props.createMood(data);
    }
  }

  handleCreateMood(event) {
    // event.preventDefault();
    // const data = new FormData();
    // console.log('hi');
    // data.append('thumbnail', event.target.files[0]);
    // data.append('name', this.state.title);
    // // this.setState({ form: { imageData: data } });
    // if (this.state.form.title.length > -1) {
    //   this.props.createMood(this.state.form, this.state.imageData);
    // }
  }

  render() {
    const { description, title, image } = this.state.form;
    return (
      <form
        action="/pictures/upload"
        encType="multipart/form-data"
        onSubmit={this.handleCreateMood.bind(this)}
      >
        <input
          type="text"
          placeholder="Mood title"
          onChange={this.handleChange.bind(this)}
          name="title"
          value={title}
        />
        <br/>
        <textarea
          type="text"
          placeholder="description"
          onChange={this.handleChange.bind(this)}
          name="description"
          value={description}
        />
        <br/>
        <input
          id="file"
          name="imageURI"
          type="file"
          onChange={this.handleFileUpload.bind(this)}
        />
        <br/>
        <button
          type="submit"
          className="btn btn-default"
        >
        Create new mood
        </button>
      </form>
    );
  };
};

const mapStateToProps = ({ moods }) => {
  return { moods };
}

export default connect(mapStateToProps, { createMood })(MoodsForm);
