// @flow

// libs

import * as React from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

// src
import SearchBar from './../Search';
import NotebookFiles from './../NotebookFiles/NotebookFiles';
import NotebookDetail from './../NotebookFiles/NotebookDetail';
import * as gistActions from './../../actions/gistsActions';


type Props = {
  gistActions: Object,
  isLoading: bool,
  notebook: Object,
  classes: Object
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

class PageHome extends React.Component<Props> {
  // state = { user: null, open: false }

  onSearchTermChange = (term) => {
    alert(term)
  }

  componentWillUnmount () {
    this.props.gistActions.resetCurrentGist()
  }

  // componentWillMount() {
  //   this.props.gistsActions.getAllGists(() => {
  //     alert('as')
  //   })
  // }

  getNotebook = (id) => {
   this.props.gistActions.getSingleGist(id)
  }

  render() {
    // const { user } = this.state
    const { classes, isLoading, notebook } = this.props

    return (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <SearchBar onSearchTermChange={(id) => this.getNotebook(id)} />
            </Paper>
            {
              isLoading &&
              <LinearProgress color="secondary" />
            }
          </Grid>
          <br />
          <Grid item xs={12} >
            <Paper className={classes.paper}>
              <Typography variant="display1" gutterBottom style={{ marginBottom: '1em' }} color='secondary'>Notebook Detail</Typography>
              <NotebookDetail isLoading={isLoading} notebook={notebook}/>
            </Paper>
          </Grid>
          <br />
          <Grid item xs={12} >
            <Paper className={classes.paper}>
                <NotebookFiles files={notebook.files} access="READ_ONLY"/>
            </Paper>
          </Grid>
        </Grid>
    );
  }
}

const mapStateToProps =  (state) => ({
  isLoading: state.gistsReducer.isLoading,
  notebook: state.gistsReducer.notebookReducer.currentGist
})

const mapDispatchToProps = dispatch => ({
  gistActions: bindActionCreators(gistActions, dispatch)
});

PageHome = withStyles(styles)(PageHome)
PageHome = connect(mapStateToProps, mapDispatchToProps)(PageHome)

export default PageHome;