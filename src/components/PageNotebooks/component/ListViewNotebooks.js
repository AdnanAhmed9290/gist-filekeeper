
// @flow

// libs

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton'

import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
// import { pathOr } from 'ramda';

// src

import * as gistsActions from './../../../actions/gistsActions'
import * as toastActions from './../../../actions/toastrActions'
import { CircularProgress } from '@material-ui/core';
import TablePaginationActionsWrapped from './../component/TablePaginationActions'
import NotebookModal from './../../Modals/NotebookModal'


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

type Props = {
  //   gistsActions: Object,
  toastActions: Object,
  classes: Object,
  isLoading: bool,
  notebooks: Array<Object>,
}

type State = {
  page: number,
  rowsPerPage: number
}

class ListViewNotebooks extends React.Component<Props, State> {
  state = {
    page: 0,
    rowsPerPage: 5,
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
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
                          <NotebookModal type="UPDATE" name={row.name} id={row.note_id} onUpdateNotebook={this.props.updateNotebook} />
                          &nbsp;
                            <CopyToClipboard
                            onCopy={() => this.props.toastActions.acToastDashMessage('Notebook ID Copied to clipboard!', 'info')}
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

    );
  }
}


// const mapStateToProps = state => ({
//   isLoading: pathOr(false, ['gistsReducer', 'isLoading'], state),
//   notebooks: pathOr([], ['gistsReducer', 'notebookReducer', 'gists'], state),
//   user: pathOr({}, ['userReducer', 'user'], state)
// })

const mapDispatchToProps = dispatch => ({
    gistsActions: bindActionCreators(gistsActions, dispatch),
  toastActions: bindActionCreators(toastActions, dispatch)
})

ListViewNotebooks = connect(null, mapDispatchToProps)(ListViewNotebooks)
ListViewNotebooks = withStyles(styles)(ListViewNotebooks)

export default ListViewNotebooks;