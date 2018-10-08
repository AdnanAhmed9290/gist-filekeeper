import React from 'react';
// libs

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton'

import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr'
// src

import * as gistsActions from './../../actions/gistsActions'
import * as toastActions from './../../actions/toastrActions'
import { CircularProgress } from '@material-ui/core';
import TablePaginationActionsWrapped from './component/TablePaginationActions'
import NotebookModal from './../Modals/NotebookModal'


let counter = 0;
function createData(name, status, notes, created, note_id) {
  counter += 1;
  return { id: counter, name, status, notes, created, note_id };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  highlight: {
    color: '#fff',
    backgroundColor: theme.palette.primary.light,
  },
  spacer: {
    flex: '1 1 50%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  componentWillMount() {
    this.props.gistsActions.getAllGists(() => {
      alert('as')
    })
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  createNotebook = (title) => {
    const data = {
      "description": title,
      "public": true,
      "files": {
        "sample-note": {
          "content": "Sample Content"
        }
      }
    }

    console.log(data)
    this.props.gistsActions.createGist(data)

  }

  updateNotebook = (title, id) => {

    const message = "Notebook Title Updated Successfully"    
    const data = {
      "description": title,
      "files": {}
    }

    console.log(data, id)
    this.props.gistsActions.editGist(data, id, message)
  
  }

  render() {
    const { classes, isLoading, notebooks } = this.props;
    const { rowsPerPage, page } = this.state;
    counter = 0;
    const rows = notebooks.map(item => {
      const status = item.public ? 'Public' : 'Private'
      const length = Object.values(item.files).length
      const created = new Date(item.created_at).toLocaleDateString()
      return createData(item.description, status, length, created, item.id)
    })
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Toolbar className={classes.highlight}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle" className={classes.highlight}>
              My Notebooks
            </Typography>

          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {/* <Button variant="contained" color="secondary">
              Add New
            </Button> */}
            <NotebookModal type="CREATE" name="" onCreateNotebook={title => this.createNotebook(title)} />
          </div>
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th">#</TableCell>
                <TableCell component="th">Name</TableCell>
                <TableCell component="th">Status</TableCell>
                <TableCell component="th">Notes</TableCell>
                <TableCell component="th">Created At</TableCell>
                <TableCell component="th">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                isLoading ?
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan="6" className="py-5 text-center">
                      <CircularProgress color="secondary" />
                    </TableCell>
                  </TableRow> :
                  <React.Fragment>

                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      return (
                        <TableRow key={row.note_id}>
                          <TableCell className="text-left" numeric>{row.id}</TableCell>
                          <TableCell className="text-left" component="th" scope="row">
                            <Link to={`/notes/${row.note_id}`}>
                              <Typography variant="subheading" color="secondary">{row.name}</Typography>
                            </Link>
                          </TableCell>
                          <TableCell className="text-left" numeric>{row.status}</TableCell>
                          <TableCell className="text-left" numeric>{row.notes}</TableCell>
                          <TableCell className="text-left" numeric>{row.created}</TableCell>
                          <TableCell className="text-left" numeric>
                            {/* <IconButton color="primary" >
                              <EditIcon />
                            </IconButton> */}
                            <NotebookModal type="UPDATE" name={row.name} id={row.note_id} onUpdateNotebook={this.updateNotebook}/>
                            &nbsp;
                            <CopyToClipboard
                              onCopy={()=> this.props.toastActions.acToastDashMessage('Notebook ID Copied to clipboard!','info')}
                              text={row.note_id}
                            >
                              <IconButton color="secondary">
                                <ShareIcon />
                              </IconButton>
                            </CopyToClipboard>
                              
                            &nbsp;
                              <IconButton variant="fab" onClick={() => { this.props.gistsActions.deleteGist(row.note_id) }} >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </React.Fragment>
              }

            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  notebooks: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.gistsReducer.isLoading,
  notebooks: state.gistsReducer.notebookReducer.gists,
  user: state.userReducer.user
})

const mapDispatchToProps = dispatch => ({
  gistsActions: bindActionCreators(gistsActions, dispatch),
  toastActions: bindActionCreators(toastActions, dispatch)
})

EnhancedTable = connect(mapStateToProps, mapDispatchToProps)(EnhancedTable)
EnhancedTable = withStyles(styles)(EnhancedTable)

export default EnhancedTable;