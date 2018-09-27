import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gistsActions from '../../actions/gists.actions';
import DynamicForm from './component/DynamicForm.view';

class Gist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            description: '',
            files: [],
            gist: {}
        }
    }

    componentDidMount() {
        this.findGist()
    }

    findGist = () => {
        const id = this.props.match.params.id

        axios({url: `https://api.github.com/gists/${id}`, method: "GET"}).then(resp => {

            Object.values(resp.data.files).map((f,index)=> {
                this.setState((prevState) => ({
                    files: [...prevState.files, {name: f.filename, content: f.content, raw_url: f.raw_url}]
                }))
            })

            this.setState({gist: resp.data,description: resp.data.description, isLoading: false})

        }).catch(err => {
            this.setState({files:null,isLoading: false})
            console.log(err)
        })
    }

    onSubmit = (model) => {
        console.log('Data: ', model)
        const id = this.props.match.params.id
        this.props.gistsActions.editGist(model, id)
    }


    render() {

        const {description, isLoading, files,gist} = this.state

        if (isLoading) {
            return <h4>Loading.....</h4>
        }

        if(files == null) {
            alert("Gist doesn't exist");
            this.props.history.push('/gists');
            return;
        }

        return (
            <div className="container text-left">
                <h1>{description}</h1>
                <h5>Owner: <b>{gist.owner.login}</b></h5>
                <p className="m-0">Created at: {new Date(gist.created_at).toLocaleDateString()}</p>
                <p className="m-0">Last Updared: {new Date(gist.updated_at).toLocaleDateString()}</p>
                <DynamicForm 
                    className="updateForm"
                    onSubmit = {(model) => {this.onSubmit(model)}}
                    data = {this.state}
                    role= "UPDATE"
                    isFetching = {isLoading}
                />
                

            </div>
        )
    }
}


Gist.prototypes = {
    isLoading: PropTypes.bool,
    gists: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    const {isLoading, gists} = state.gistsReducer;
    return {isLoading, gists};
}

const mapDispatchToProps = dispatch => ({
    gistsActions: bindActionCreators(gistsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Gist);