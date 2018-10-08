
// libs
import React, { Component } from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import DraftsIcon from '@material-ui/icons/Notes';

// src
import FileModal from "../Modals/FileModal";
import EditModal from '../Modals/CreateFileModal'
import { Typography } from '@material-ui/core';

class SingleFile extends Component {

    state = {
        open: false
    }

    render() {
        
        const {data, access, onDelete} = this.props
        
        return (
            <React.Fragment>
                <ListItem button onClick={() => { this.setState({ open: !this.state.open }) }} selected={this.state.open}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={data.name} />
                    {this.state.open ? <ExpandLess color="secondary" /> : <ExpandMore color="secondary"/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" align="left"  unmountOnExit>
                    <div className="btn-group my-3 text-left pl-5">
                        <div className="content">
                            <Typography variant="body2" >{data.content}</Typography>
                        </div>
                        {/* <FileModal data={data}/> */}
                        {
                            access === "READ_WRITE" &&
                            <React.Fragment>
                                &nbsp;
                                <EditModal type="EDIT" data={data} updateNotebook={this.props.onNotebookUpdate} />
                                &nbsp;
                                <IconButton color="default" onClick={() => {onDelete(data.name)}}>
                                    <DeleteIcon />
                                </IconButton>
                            </React.Fragment>
                        }
                    </div>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default SingleFile