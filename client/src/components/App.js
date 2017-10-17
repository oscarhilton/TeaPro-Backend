import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Dashboard from './Dashboard';
import CategoryPage from './CategoryPage';
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getAllTeas();
    this.props.getAllCategories();
    // this.props.newTea('fhsdhfdshjfh', '59e4d6d543bb3f6add4a8f4b');
    // this.props.newTea('Blablabla', '59e4d32043bb3f6add4a8f4a');
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/category/:name" component={CategoryPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
