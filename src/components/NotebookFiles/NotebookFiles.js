
// libs
import React from 'react'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

// src
import SingleFile from './SingleFile'
import AddFileModal from './../Modals/CreateFileModal'

const NotebookFiles = (props) => {
    return (
        <React.Fragment>
            <Typography variant="display1" style={{ marginBottom: '1em' }} color='secondary'>Notes</Typography>

            <List component='nav'>

                {
                    props.files.length === 0 ?
                        <Typography paragraph variant="subheading" align="left">No Notes in this notebook</Typography>
                        :
                        props.files.map((item, idx) => (
                            <SingleFile data={item} key={idx + 1000} {...props}/>
                        ))
                }
            </List>
            {
                props.access === 'READ_WRITE' &&
                
                <React.Fragment>
                    <Divider />
                    
                    <div className="btn my-3">
                        {/* <Button variant="contained" color="error">Add File</Button> */}
                        <AddFileModal type="CREATE" data={{ name: '', content: '' }} updateNotebook={props.onNotebookUpdate} />
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default NotebookFiles