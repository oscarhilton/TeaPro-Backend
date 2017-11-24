import React, { Component } from 'react';
import './style.css';

import Button from '../Button';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPopup: true
    };
  }
  handlePopupClick() {
    const current = this.state.displayPopup;
    this.setState({
      displayPopup: !current
    })
  }
  renderPopup() {
    if (this.state.displayPopup) {
      return ( <div className="popup">{this.props.popup}</div> )
    }
    return null;
  }
  render() {
    return (
      <div className="bottom-bar">
        {this.renderPopup()}
        <div className="popup-button">
          <Button
            onClick={this.handlePopupClick.bind(this)}
          >
            {this.props.buttonText}
          </Button>
        </div>
      </div>
    );
  }

}

export default BottomBar;
