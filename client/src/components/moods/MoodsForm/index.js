import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMood } from '../../../actions/moodsActions';
import SelectFile from '../../media/SelectFile';

class MoodsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: '',
        image: ''
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

  handleSelectFile(event) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        image: event.target.value
      }
    });
  }

  handleCreateMood(event) {
    event.preventDefault();
    if (this.state.form.title.length > 1) {
      this.props.createMood(this.state.form);
      this.setState({
        form: {
          title: '',
          description: '',
          image: ''
        }
      })
    }
  }

  render() {
    const { description, title, image } = this.state.form;
    return (
      <form
        onSubmit={this.handleCreateMood.bind(this)}
      >
        <div className="form-group">
          <label for="title">Mood title</label>
          <input
            id="title"
            type="text"
            onChange={this.handleChange.bind(this)}
            name="title"
            value={title}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label for="description">Mood description</label>
          <textarea
            id="description"
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            name="description"
            value={description}
          />
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <SelectFile
            onChange={this.handleSelectFile.bind(this)}
          />
        </div>
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
