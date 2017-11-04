import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Dashboard from './Dashboard';
import CategoryPage from './CategoryPage';
import Moods from './moods/Moods';
import ShowMedia from './media/ShowMedia';
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getAllTeas();
    this.props.getAllCategories();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/category/:title" component={CategoryPage} />
            <Route exact path="/moods" component={Moods} />
            <Route exact path="/moods/:name" component={Moods} />
            <Route exact path="/media" component={ShowMedia} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
