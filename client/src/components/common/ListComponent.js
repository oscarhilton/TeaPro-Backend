import React, { Component } from 'react';
import TeaCard from '../TeaCard';

class ListComponent extends Component {
  render() {
    return (
      <ul>
      {this.props.data.map(item =>
        <li className="list-group-item" key={item._id}>
          <TeaCard tea={item} />
        </li>
      )}
      </ul>
    );
  }
};

export { ListComponent };
