import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeaCard from './TeaCard';

class TeasList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const teas = this.props.teas;
    console.log(teas);
    return (
      <div>
        <h2>All Teas</h2>
        <ul>
          {Object.values(teas).map(tea =>
            <li className="list-group-item" key={tea.title}>
              <TeaCard tea={tea} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ teas }) {
  return { teas: teas }
}

export default connect(mapStateToProps)(TeasList);
