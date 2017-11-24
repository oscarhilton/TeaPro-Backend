import React, { Component } from 'react';

class ListComponent extends Component {
  render() {
    return (
      <ul>
      {this.props.data.map(item =>
        <li className="list-group-item" key={item._id}>
          {this.props.children}
        </li>
      )}
      </ul>
    );
  }
};

export { ListComponent };
