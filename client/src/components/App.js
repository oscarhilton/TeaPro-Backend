import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Teas from './Teas';
const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getAllTeas();
    this.props.getAllCategories();
    // this.props.newTea('Another tea!', '59e3eb58bf93542fd78edab6');
    // this.props.newTea('One more!', '59e3eb58bf93542fd78edab6');
    // this.props.newTea('And Another!', '59e3eb58bf93542fd78edab6');
    // this.props.newTea('And Another one!', '59e3eb58bf93542fd78edab6');
    // this.props.newTea('bsfhbasfhb!', '59e3eb58bf93542fd78edab6');
    // this.props.newTea('asdsadasdasdas235!', '59e3eb58bf93542fd78edab6');
    // this.props.getTeaCategory('59e3d2eb8ae59b1c9e51cdce');
    // this.props.getCategoryTeas('59e3c1dcc2554810240cf238');
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/teas" component={Teas} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
