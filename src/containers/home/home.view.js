import _ from 'lodash';

import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import SearchBar from '../../components/search/search'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  searchUser = (term) => {

    axios
      .get(`https://api.github.com/users/${term}`)
      .then(res => {
        console.log(res);
        this.setState({user: res.data});
      })
  }

  getGists = (id) => {
    axios
      .get(`https://api.github.com/users/${id}/gists`)
      .then(res => {
        console.log(res);
        // this.setState({user: res.data});
      })
  }

  render() {

    const userSearch = _.debounce((term) => {
      this.searchUser(term)
    }, 300)
    const {user} = this.state;
    return (
      <div className="container">
        <h3>This is a Home Component</h3>
        <SearchBar onSearchTermChange={userSearch}/>
        <br/> {this.state.user == null
          ? <h2>No user found</h2>
          : <div className="user-data">
            <h1>{user.name}</h1>
            <h5>{user.email || 'no-email'}</h5>

            <button onClick={this.getGists(user.name)}>Get User public Gists</button>
          </div>
}
      </div>
    );
  }
}

export default Home;