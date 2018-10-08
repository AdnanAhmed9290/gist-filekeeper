
// libs
import React from 'react'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

// src
const NotebookDetail = (props) => {

    const { isLoading, notebook } = props

    // if (notebook.description === '') {
    //     return (
    //         <React.Fragment>
    //            <Typography paragraph variant="subheading" align="left">Enter NotebookID to get details...</Typography>
    //         </React.Fragment>
    //     )
    // }

    return (
        <React.Fragment>
            {
                isLoading ?
                    <CircularProgress size={35} color="secondary" /> :
                    <React.Fragment >
                        <Grid container spacing={32} wrap="nowrap">
                            {
                                notebook.description === '' ?

                                    <Grid item xs={12}>
                                        <Typography paragraph variant="subheading" align="left">Enter NotebookID to get details...</Typography>

                                    </Grid>
                                    :
                                    <React.Fragment>
                                        <Grid item xs={3}>
                                            <Typography variant="title" align="left">Title</Typography>
                                            <Typography variant="body1" align="left">{notebook.description}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="title" align="left">Owner</Typography>
                                            <Typography variant="body1" align="left">{notebook.owner}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="title" align="left">Created At</Typography>
                                            <Typography variant="body1" align="left">{new Date(notebook.created_at).toLocaleDateString()}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="title" align="left">Updated At</Typography>
                                            <Typography variant="body1" align="left">{new Date(notebook.updated_at).toLocaleDateString()}</Typography>
                                        </Grid>
                                    </React.Fragment>

                            }

                        </Grid>
                    </React.Fragment>
            }


        </React.Fragment>
    )
}

export default NotebookDetail