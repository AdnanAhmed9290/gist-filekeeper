import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'


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
});

class DeleteModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
      const {data} = this.props
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton onClick={this.handleOpen} variant="fab" color="primary">
          <DeleteIcon />
        </IconButton>
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
            <Typography variant="title" color="secondary" id="modal-title" gutterBottom>
              Are you sure, you want to delete?
            </Typography>

            <div className="btn">
                <Button variant="contained">
                    Yes
                </Button>
                <Button variant="contained" onClick={()=> this.setState({open: false})}>
                    No
                </Button>

            </div>

            />
          </div>
        </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const DeleteModal = withStyles(styles)(DeleteModal);

export default DeleteModal;