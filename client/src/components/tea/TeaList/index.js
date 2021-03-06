import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';

import TeaCard from '../TeaCard/';

class TeasList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const teas = this.props.teas;
    return (
      <ul className="tea-list-ul">
        {Object.values(teas).map(tea =>
          <li key={tea.title} className="tea-list">
            <TeaCard tea={tea} />
          </li>
        )}
      </ul>
    );
  }
}

function mapStateToProps({ teas }) {
  return { teas }
}

export default connect(mapStateToProps)(TeasList);
