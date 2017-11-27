import React, { Component } from 'react';
import './style.css';

import Button from '../Button';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPopup: false
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
    const showBackground = this.state.displayPopup ? 'show' : 'hide';
    const buttonText = this.state.displayPopup ? 'close' : this.props.buttonText;
    return (
      <div className="bottom-bar">
        {this.renderPopup()}
        <div className="popup-button">
          <Button
            onClick={this.handlePopupClick.bind(this)}
          >
            {buttonText}
          </Button>
        </div>
        <div className={`background ${showBackground}`}></div>
      </div>
    );
  }

}

export default BottomBar;
