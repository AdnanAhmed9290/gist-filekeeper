
// @flow

// libs

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'

import ListViewIcon from '@material-ui/icons/ViewList'
import BoardViewIcon from '@material-ui/icons/ViewModule'


import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { pathOr } from 'ramda';

// src

import * as gistsActions from './../../actions/gistsActions'
import * as toastActions from './../../actions/toastrActions'
// import { CircularProgress } from '@material-ui/core';
import NotebookModal from './../Modals/NotebookModal'
import ListViewNotebooks from "./component/ListViewNotebooks"
import BoardViewNotebooks from "./component/BoardViewNotebooks";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit ,
    paddingBottom: '1px'
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
  gistsActions: Object,
  toastActions: Object,
  classes: Object,
  isLoading: bool,
  notebooks: Array<Object>,
}

type State = {
  view: bool
}

class PageNotebooks extends React.Component<Props, State> {
  state = {
    view: false
  };

  componentWillMount() {
    this.props.gistsActions.getAllGists()
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

  addNewNote = (data, id) => {
    const message = "New note added Successfully!"

    console.log(data, id)
    this.props.gistsActions.editGist(data, id, message)
  }

  render() {
    const { classes, isLoading, notebooks } = this.props;

    return (
      <React.Fragment>
        <div className="btn-group text-right">
          <IconButton onClick={() => this.setState({ view: false })} >
            <BoardViewIcon />
          </IconButton>
          <IconButton onClick={() => this.setState({ view: true })} >
            <ListViewIcon />
          </IconButton>
        </div>

        <Paper className={classes.root}>
          <Toolbar className={classes.highlight}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle" className={classes.highlight}>
                My Notebooks
            </Typography>

            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <NotebookModal type="CREATE" name="" onCreateNotebook={title => this.createNotebook(title)} />
            </div>
          </Toolbar>


          {
            this.state.view ?
              <ListViewNotebooks notebooks={notebooks} isLoading={isLoading} updateNotebook={this.updateNotebook}/> :
              <BoardViewNotebooks isLoading={isLoading} notebooks={notebooks} updateNotebook={this.addNewNote} />
          }

        </Paper>

      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: pathOr(false, ['gistsReducer', 'isLoading'], state),
  notebooks: pathOr([], ['gistsReducer', 'notebookReducer', 'gists'], state),
  user: pathOr({}, ['userReducer', 'user'], state)
})

const mapDispatchToProps = dispatch => ({
  gistsActions: bindActionCreators(gistsActions, dispatch),
  toastActions: bindActionCreators(toastActions, dispatch)
})

PageNotebooks = connect(mapStateToProps, mapDispatchToProps)(PageNotebooks)
PageNotebooks = withStyles(styles)(PageNotebooks)

export default PageNotebooks;