import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
//BrowserRouter accepts only one child component
//to make sure that a component is displayed all the time,
//just place the component as firx child of BrowserRouter > div
class App extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchUser();
  }
 render() {
  return(
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
        </div>
      </BrowserRouter>
    </div>
  );
 }
}

//where null is, is where the mapStateToProps would be
export default connect(null, actions)(App);