import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
// import axios from 'axios';
import * as gistsActions from '../../actions/gists.actions';

import Pagination from '../../components/pagination/pagination'

class Gists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      allGists: [],
      currentGists: [],
      currentPage: null,
      totalPages: null,
      pageLimit: 5
    }
  }

  componentDidMount() {
    
    this.getGists();

    this
      .props
      .gistsActions
      .getAllGists();

  }

  getGists = () => {

    fetch(`https://api.github.com/users/${this.props.user.login}/gists`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      // console.log(data)
    }).catch(error => {
      console.log(error)
    })
  
  }

  handleSelectChange = (e) => {
    this.setState({pageLimit: parseInt(e.target.value, 10)})
    this.onPageChanged
  }


  onPageChanged = data => {
    const { gists } = this.props;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentGists = gists.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentGists, totalPages });
  };

  render() {

    return (
      <div className="container text-left">

        <div className="d-flex justify-content-between">
          <Link className="btn btn-primary" to="/add" >Add New Gist</Link>
          <select className="form-control" style={{maxWidth: '100px'}} value={this.state.pageLimit} onChange={this.handleSelectChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <table className="table table-bordered mt-3 text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Scope</th>
              <th scope="col">Files</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            
            { this.props.isLoading ?
              <tr><td colSpan="5">Loading...</td></tr>
              :
              this.state.currentGists.map((gist, index) => {
                return (
                  <tr key={gist.id}>
                      <th scope="row">{(index+1)+(6*(this.state.currentPage-1))}</th>
                      <td>{gist.description}</td>
                      <td>{gist.public ? 'Public' : 'Private'}</td>
                      <td>{Object.values(gist.files).length}</td>
                      <td>
                        <Link className="btn btn-default" to={`/gists/${gist.id}`}>View/Edit</Link>
                        &nbsp;
                        <button onClick={()=>{this.props.gistsActions.deleteGist(gist.id)}} className="btn btn-danger">Delete</button>
                      </td>
                </tr>
                )
              })
            }

            {
              !this.props.isLoading && this.props.gists.length === 0 && 
              <tr><td colSpan="5">You have no data</td></tr>
            }

          </tbody>
        </table>
        
        {!this.props.isLoading &&
        <div className="d-flex flex-row py-4 align-items-center">
            <Pagination
              totalRecords={this.props.gists.length}
              pageLimit={this.state.pageLimit}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
        </div>
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  const {isLoading, gists} = state.gistsReducer;
  const {user} = state.userReducer;
  return {isLoading, gists, user};
}

const mapDispatchToProps = dispatch => ({
  gistsActions: bindActionCreators(gistsActions, dispatch)
});

Gists.prototypes = {
  isLoading: PropTypes.bool,
  gists: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Gists);