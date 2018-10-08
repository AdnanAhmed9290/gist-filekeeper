
//libs
import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    input: {
        width: '300px'
    },
    button: {
        marginTop: theme.spacing.unit * 2
    }
});

class SearchBar extends React.Component {

    state = { term: '' };

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSearchTermChange(this.state.term)
    }

    render() {

        const { classes } = this.props

        return (
            <div className="search-bar">
                <form onSubmit={this.onSubmit}>
                    <TextField
                        id="notebook-id"
                        label="Notebook ID"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)}
                        margin="normal"
                        // type="number"
                        color="secondary"
                        className={classes.input}
                        required
                    />
                    <IconButton aria-label="Search" type="submit" className={classes.button}>
                        <SearchIcon color="secondary" />
                    </IconButton>

                </form>

            </div>
        );
    }

    onInputChange(term) {
        this.setState({ term })
    }

}

export default withStyles(styles)(SearchBar);