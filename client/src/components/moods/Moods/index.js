import React, { Component } from 'react';
import './style.css';
import MoodsForm from '../MoodsForm/';
import MoodsList from '../MoodsList/';
import Pannel from '../../common/Pannel/';
import BottomBar from '../../common/BottomBar/';

class Moods extends Component {
  render() {
    return (
      <div>
        <div>
          <MoodsList />
        </div>
        <div>
          <BottomBar
            popup=
            {
              <Pannel>
                <MoodsForm />
              </Pannel>
            }
            buttonText="Create new mood"
          />
        </div>
      </div>
    );
  };
}

export default Moods;
