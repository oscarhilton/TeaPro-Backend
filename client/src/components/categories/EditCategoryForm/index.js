import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import SelectFile from '../../media/SelectFile';
import Pannel from '../../common/Pannel';
import {
  editCategory
} from '../../../actions';

class EditCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        background: this.props.background,
        image: ''
      }
    }
  }

  handleChange(event) {
    if (event.target.value.length > 0) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value
        }
      });
    }
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

  handleUpdate(e) {
    e.preventDefault();
    const { selected } = this.props.categories;
    const { background, image } = this.state.form;
    if ( background.length > 0 && image.length > 0 ) {
      this.props.editCategory(selected._id, this.state.form);
    } else {
      console.log('COULD NOT SUBMIT'); // HANDLE THIS..
    }
  }

  render() {
    const { background } = this.state.form;
    return (
      <Pannel>
        <form>
          <div className="form-group">
            <label for="background">Background colour</label>
            <input
              id="background"
              placeholder="Background colour"
              onChange={this.handleChange.bind(this)}
              name="background"
              value={ background }
              className="form-control"
            />
            <br/>
            <SelectFile
              onChange={this.handleSelectFile.bind(this)}
            />
            <br/>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleUpdate.bind(this)}
            >
            Update Category
            </button>
          </div>
        </form>
      </Pannel>
    );
  };
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps, { editCategory })(EditCategoryForm);
