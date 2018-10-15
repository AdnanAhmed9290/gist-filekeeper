
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
// import FileModal from "../Modals/FileModal";
import EditModal from '../Modals/CreateFileModal'
import { Typography } from '@material-ui/core';

class SingleFile extends Component {

    state = {
        open: false
    }

    onDelete = () => {
        const { data, onDelete } = this.props
        this.setState({ open: false })
        onDelete(data.name)
    }

    render() {

        const { data, access } = this.props

        return (
            <React.Fragment>
                <ListItem button onClick={() => { this.setState(() => ({ open: !this.state.open })) }} selected={this.state.open}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={data.name} />
                    {this.state.open ? <ExpandLess color="secondary" /> : <ExpandMore color="secondary" />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" align="left" color="secondary" unmountOnExit>
                    <div className="collapseBody my-3 text-left px-5 w-100 position-relative">
                        <div className="content">
                            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }} >{data.content}</Typography>
                        </div>
                        {/* <FileModal data={data}/> */}
                        {
                            access === "READ_WRITE" &&
                            <div className="btn-group position-absolute" style={{ top: 0, right: 0 }}>
                                &nbsp;
                                <EditModal type="EDIT" data={data} updateNotebook={this.props.onNotebookUpdate} />
                                &nbsp;
                                <div>
                                    <IconButton color="default" onClick={this.onDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        }
                    </div>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default SingleFile