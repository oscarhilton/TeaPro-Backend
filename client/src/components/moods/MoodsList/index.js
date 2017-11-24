/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoodCard from '../MoodCard/';

import { requestMoods, returnAllMoods } from '../../../actions/moodsActions';

import './style.css';

class MoodsList extends Component {
  componentDidMount() {
    this.props.requestMoods();
    this.props.returnAllMoods();
  }

  renderMoods() {
    const { loading, moods } = this.props.moods;
    console.log(moods);

    const moodsList =
          moods.map((mood) =>
          <li className="mood-item">
            <MoodCard title={mood.title} image={mood.image} />
          </li>);

    switch(loading) {
      case true:
        return (<p>loading......</p>);
      case false:
        return (
          <ul className="moods-list">
            {moodsList}
          </ul>
      );
      default:
        return (<p>ready</p>);
    };
  }

  render() {
    return (
      <div>
        {this.renderMoods()}
      </div>
    );
  }
}

const mapStateToProps = ({ moods }) => {
  return { moods };
}

export default connect(mapStateToProps, { requestMoods, returnAllMoods })(MoodsList);
