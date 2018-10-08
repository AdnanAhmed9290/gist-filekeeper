
// libs

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gistsActions from '../../actions/gistsActions';
import { withStyles } from '@material-ui/core';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// src
import NotebookFiles from '../NotebookFiles/NotebookFiles';
import NotebookDetail from '../NotebookFiles/NotebookDetail';


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


class SingleGist extends Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.gistsActions.getSingleGist(id)
    }

    componentWillUnmount() {
        this.props.gistsActions.resetCurrentGist()
    }

    // onSubmit = (model) => {
    //     console.log('Data: ', model)
    //     const id = this.props.match.params.id
    //     this.props.gistsActions.editGist(model, id)
    // }

    updateNotebook = (data) => {
        const id = this.props.match.params.id
        const message = "Note Updated Successfully"
        data.description = this.props.notebook.description
        this.props.gistsActions.editGist(data, id, message)
    }

    deleteNote = (name) => {
        const id = this.props.match.params.id
        const message = "Note Deleted Successfully"
        const data = {
            "description": this.props.notebook.description,
            "files": {}
        }
        data.files[name] = null
        this.props.gistsActions.editGist(data, id, message)
    }

    render() {

        const { isLoading, notebook, classes } = this.props

        return (
            <Grid container={false} spacing={24} >
                <Grid item xs={12} spacing={24} >
                    <Paper className={classes.paper}>
                        <Typography variant="display1" gutterBottom style={{ marginBottom: '1em' }} color='secondary'>Notebook Detail</Typography>
                        <NotebookDetail isLoading={isLoading} notebook={notebook} />
                    </Paper>
                </Grid>
                <br />
                <Grid item xs={12} spacing={24}>
                    <Paper className={classes.paper}>
                        <NotebookFiles files={notebook.files} access="READ_WRITE" onNotebookUpdate={this.updateNotebook} onDelete={this.deleteNote} />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


SingleGist.prototypes = {
    isLoading: PropTypes.bool,
    notebook: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.gistsReducer.isLoading,
    notebook: state.gistsReducer.notebookReducer.currentGist
})

const mapDispatchToProps = dispatch => ({
    gistsActions: bindActionCreators(gistsActions, dispatch)
});

SingleGist = connect(mapStateToProps, mapDispatchToProps)(SingleGist)
SingleGist = withStyles(styles)(SingleGist)

export default SingleGist;