import React from 'react';
import {Link} from 'react-router-dom'

const Header = (props) => {

    const {isAuthenticated, handleLogout, user} = props;
  
    return (
      <div className="header" style={{color: '#fff'}}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Gist Notekeeper</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/gists" className="nav-link">Gists</Link>
              </li>
  
            </ul>
            {isAuthenticated
              ? <ul className="navbar-nav ml-auto">
                  <li className="nav-item mr-3">
                    <img src={user.avatar_url} alt=".,." className="rounded-circle" width="40"/>
                    <p className="m-0">{user.name ||user.login}</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-warning mt-2"
                      onClick={() => {
                      handleLogout()
                    }}><b>Logout</b></button>
                  </li>
                </ul>
  
              : <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link btn btn-info">Login</Link>
                </li>
              </ul>
                }
          </div>
        </nav>
      </div>
  
    )
  
  }

  export default Header;