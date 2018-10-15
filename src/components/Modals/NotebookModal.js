
// libs

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import BookIcon from '@material-ui/icons/Book'
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

class NotebookModal extends React.Component {
    state = {
        open: false,
        title: this.props.name
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit = (e) => {
        e.preventDefault()
        const { title } = this.state

        if(this.props.type === 'CREATE') {
            this.props.onCreateNotebook(title)
        }else{
            const {id} = this.props
            this.props.onUpdateNotebook(title, id)
        }
        this.setState({
            open:false,
            title: this.props.name
        })
        // this.props.updateNotebook(data)
    }

    render() {
        const { classes, type } = this.props;

        return (
            <React.Fragment>

                {
                    type === 'CREATE' ?
                        <Button onClick={this.handleOpen} variant="contained" color="secondary">
                            Add New <BookIcon className={classes.rightIcon} />
                        </Button> :
                        <IconButton color="primary" onClick={this.handleOpen} >
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
                        <Typography gutterBottom variant="title" color="secondary" >
                            {
                                type === 'CREATE' ? 'Create New Notebook' : 'Update Notebook'
                            }
                        </Typography>
                        <div style={{ position: 'absolute', top: '5px', right: '1em' }}>
                            <IconButton onClick={this.handleClose} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                id="title"
                                label="Notebook Title"
                                value={this.state.title}
                                onChange={e => { this.setState({ title: e.target.value }) }}
                                margin="normal"
                                fullWidth
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
            </React.Fragment>
        );
    }
}

NotebookModal.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
NotebookModal = withStyles(styles)(NotebookModal);

export default NotebookModal;