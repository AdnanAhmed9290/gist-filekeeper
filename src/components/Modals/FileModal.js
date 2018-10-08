import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close'
import ViewIcon from '@material-ui/icons/Note'


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

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div>
        <IconButton onClick={this.handleOpen} variant="fab" color="primary">
          <ViewIcon />
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
              {data.name}
            </Typography>

            <TextField
                id="content"
                label="Note Content"
                value={data.content}
                onChange={(e)=> console.log(e.target.value) }
                margin="normal"
                fullWidth
                multiline
                rows="7"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FileModal = withStyles(styles)(SimpleModal);

export default FileModal;