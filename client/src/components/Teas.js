import React, { Component } from 'react';
import { connect } from 'react-redux';


import TeasList from './TeasList';
import Categories from './Categories';

class Teas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Categories />
        <TeasList />
      </div>
    );
  }
}

export default connect()(Teas);
