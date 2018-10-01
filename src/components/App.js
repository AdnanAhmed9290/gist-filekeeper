import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Home from './../containers/home/home.view';
import Gists from './../containers/gists/gists.view';
import Gist from './../containers/gists/gist.view';
import AddGist from './../containers/gists/addGist.view';
import Auth from "./auth/auth";
import Header from "../components/header/header";

import * as userActions from '../actions/user.actions';


function AuthenticatedRoute({ component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
      ? <Component {...props} {...rest}/>
      : <Redirect
        to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }}/>}/>
  )
}

class App extends Component {

  handleSocialLogin = (token) => {
    this
      .props
      .userActions
      .injectUser(token);
  }

  logout = () => {
    alert('Logging Out');
    this
      .props
      .userActions
      .logoutUser();
  }

  render() {

    const {isAuthenticated, currentUser, isLoading} = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <div>

            <Header
              isAuthenticated={isAuthenticated}
              user={currentUser}
              handleLogout={() => {this.logout()}}/>
            <br/>
            <AuthenticatedRoute
              exact
              path="/"
              authenticated={isAuthenticated}
              component={Home}/>
            <AuthenticatedRoute
              exact
              path="/gists"
              authenticated={isAuthenticated}
              component={Gists}/>
            <AuthenticatedRoute
              exact
              path="/gists/:id"
              authenticated={isAuthenticated}
              component={Gist}/>
            <AuthenticatedRoute
              exact
              path="/add"
              authenticated={isAuthenticated}
              component={AddGist}/>
            <Route
              exact
              path="/login"
              render={(props) => {
              return <Auth
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                handleLogin={(token) => {
                this.handleSocialLogin(token)
              }}
                {...props}/>
            }}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.object
};

const mapStateToProps = state => {
  const {isAuthenticated, user, isLoading} = state.userReducer;
  return {isAuthenticated, currentUser: user, isLoading};
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

