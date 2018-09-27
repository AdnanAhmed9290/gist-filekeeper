import React from 'react';


class SearchBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    render() {
        return (
            <div className="search-bar">
                <input className="form-control"
                    value= {this.state.term}
                    // onChange={(event) =>
                    // this.setState({ term: event.target.value })} 
                    onChange={ event => this.onInputChange(event.target.value) }
                />
                {/* <br />
                Value of input: {this.state.term} */}
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}

export default SearchBar;