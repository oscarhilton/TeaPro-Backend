import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeasList from './TeasList';
import Categories from './Categories';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Categories />
        <TeasList />
      </div>
    );
  }
}

export default connect()(Dashboard);
