// libs
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles'
import Toastr from './../Notifications'

// src
import './App.css';
import { PageHome, PageGists, SingleNotebook, AddGist, MyNotebooks, SingleGist } from './../index';

import Auth from "./../Auth"
import Header from "../Header"
import * as userActions from './../../actions/userActions'
import * as toastrActions from './../../actions/toastrActions'

import withRoot from './../../withRoot';


function AuthenticatedRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      render={(props) => authenticated
        ? <Component {...props} {...rest} />
        : <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }} />}
      {...rest}

    />
  )
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends Component {

  handleSocialLogin = (token) => {
    this
      .props
      .userActions
      .injectUser(token);
  }

  logout = () => {
    this
      .props
      .userActions
      .logoutUser();
    this.props.toastrActions.acToastDashMessage('Logged out!', 'info')
  }


  toasted = () => {
    this.props.toastrActions.acToastDashClear()
  }

  render() {

    const { isAuthenticated, currentUser, isLoading, classes, toast } = this.props;
    return (
      <div className={classes.root}>
        <ConnectedRouter history={this.props.history}>
          <React.Fragment>
            <Header
              isAuthenticated={isAuthenticated}
              user={currentUser}
              handleLogout={() => { this.logout() }} />

            <Toastr
              open={toast.open}
              message={toast.message}
              type={toast.kind}
              duration={3000}
              onRequestClose={this.toasted}

            />
            <div className="container my-5">
              <Switch>
                <Route
                  exact
                  path="/"
                  authenticated={isAuthenticated}
                  component={PageHome} />
                <AuthenticatedRoute
                  exact
                  path="/notes"
                  authenticated={isAuthenticated}
                  component={MyNotebooks} />
                <AuthenticatedRoute
                  exact
                  path="/notes/:id"
                  authenticated={isAuthenticated}
                  component={SingleNotebook} />
                <AuthenticatedRoute
                  exact
                  path="/gists"
                  authenticated={isAuthenticated}
                  component={PageGists} />
                <AuthenticatedRoute
                  exact
                  path="/gists/:id"
                  authenticated={isAuthenticated}
                  component={SingleGist} />
                <AuthenticatedRoute
                  exact
                  path="/add"
                  authenticated={isAuthenticated}
                  component={AddGist} />

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
                      {...props} />
                  }} />
              </Switch>
            </div>
          </React.Fragment>
        </ConnectedRouter>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  currentUser: state.userReducer.user,
  isLoading: state.userReducer.isLoading,
  toast: state.toastrReducer.toast
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  toastrActions: bindActionCreators(toastrActions, dispatch)
});

App = connect(mapStateToProps, mapDispatchToProps)(App)
App = withRoot(withStyles(styles)(App))

export default App;

