import React, { Component } from 'react';
import { connect } from 'react-redux';

import TeasList from './tea/TeasList';
import Categories from './categories/Categories';

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
