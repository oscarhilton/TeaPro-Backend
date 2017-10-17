import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Login with google</a>;
      default:
        return (
          <span className="text-primary">
            Hello {this.props.auth.firstName}. <a href="/api/logout">Logout</a>
          </span>
        );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse text-white">
        <h2 className="text-white">TeaPro backend</h2>
        {this.renderContent()}
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
