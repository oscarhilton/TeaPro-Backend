import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMood } from '../../actions/moodsActions';
import SelectFile from '../media/SelectFile';

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
    console.log(this.state);
    if (this.state.form.title.length > 1) {
      this.props.createMood(this.state.form);
    }
  }

  render() {
    const { description, title, image } = this.state.form;
    return (
      <form
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
        <SelectFile
          onChange={this.handleSelectFile.bind(this)}
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
