import React, { Component } from 'react';
import './style.css';

import Button from '../../common/Button';

class EditMood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  renderEditForm() {
    if (this.state.open) {
      return (
        <p>Open</p>
      )
    }
    return (
      <div className="bla">
        <Button>
          Edit
        </Button>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderEditForm()}
      </div>
    );
  }

}

export default EditMood;
