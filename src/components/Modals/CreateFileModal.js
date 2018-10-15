
// @flow

// libs

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add'

import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core'


function getModalStyle() {
    const top = 40;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'relative',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

type Props = {
    classes: Object,
    data: Object,
    type: bool,
    updateNotebook: Function
}

type State = {
    open: bool,
    title: string,
    content: string
}

class CreateFileModal extends React.Component<Props, State> {
    state = {
        open: false,
        title: this.props.data.name,
        content: this.props.data.content
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit = (e) => {
        e.preventDefault()
        const { title, content } = this.state
        const oldTitle = this.props.data.name
        let data = {
            "description": '',
            "files": {}
        }

        data.files[title] = { content }

        if (this.props.type === 'EDIT') {
            if (title !== oldTitle) {
                data.files[oldTitle] = null
            }
        }

        this.setState({
            title: this.props.data.name,
            content: this.props.data.content,
            open: false
        })

        if (this.props.id !== undefined) {
            data.description = this.props.data.description
            this.props.updateNotebook(data, this.props.id)
        }
        else
            this.props.updateNotebook(data)


    }

    render() {
        const { classes, type } = this.props;

        return (
            <div>

                {
                    type === 'CREATE' ?
                        <Button onClick={this.handleOpen} variant="fab" color="primary">
                            <AddIcon />
                        </Button>
                        :
                        <IconButton onClick={this.handleOpen} color="default">
                            <EditIcon />
                        </IconButton>
                }
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>

                        <div style={{ position: 'absolute', top: '5px', right: '1em' }}>
                            <IconButton onClick={this.handleClose} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <Typography gutterBottom variant="title" color="secondary" >
                            {
                                type === 'CREATE' ? 'Create New Note' : 'Update Note'
                            }
                        </Typography>

                        <form onSubmit={this.onSubmit}>
                            <TextField
                                id="title"
                                label="Note Title"
                                value={this.state.title}
                                onChange={e => { this.setState({ title: e.target.value }) }}
                                margin="normal"
                                fullWidth
                                required
                            />
                            <TextField
                                id="content"
                                label="Note Content"
                                value={this.state.content}
                                onChange={e => { this.setState({ content: e.target.value }) }}
                                margin="normal"
                                fullWidth
                                multiline
                                rows="6"
                                required
                            />
                            <div className="mt-4">
                                <Button variant="contained" color="secondary" type="submit">
                                    SAVE
                                    <SaveIcon className={classes.rightIcon} />
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}


// We need an intermediary variable for handling the recursive nesting.
CreateFileModal = withStyles(styles)(CreateFileModal);

export default CreateFileModal;