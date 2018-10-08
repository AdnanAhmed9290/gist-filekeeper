import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gistsActions from '../../actions/gistsActions';
import DynamicReduxForm from './component/DynamicReduxForm';
import DynamicForm from './component/DynamicForm.view';


class SingleGist extends Component {

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.gistsActions.getSingleGist(id)
    }

    componentWillUnmount() {
        this.props.gistsActions.resetCurrentGist()
    }

    onSubmit = (model) => {
        console.log('Data: ', model)
        const id = this.props.match.params.id
        this.props.gistsActions.editGist(model, id)
    }


    render() {

        const { isLoading, currentGist } = this.props

        if (isLoading) {
            return <h4>Loading.....</h4>
        }

        if (currentGist == null) {
            alert("Gist doesn't exist");
            this.props.history.push('/gists');
            return;
        }

        return (
            <div className="container text-left">
                <h1>{currentGist.description}</h1>
                <h5>Owner: <b>{currentGist.owner}</b></h5>
                <p className="m-0">Created at: {new Date(currentGist.created_at).toLocaleDateString()}</p>
                <p className="m-0">Last Updared: {new Date(currentGist.updated_at).toLocaleDateString()}</p>
                {/* <DynamicReduxForm 
                    className="updateForm"
                    onSubmit = {(model) => {this.onSubmit(model)}}
                    // data = {this.state}
                    role= "UPDATE"
                    // isFetching = {isLoading}
                /> */}

                <DynamicForm
                    className="updateForm"
                    onSubmit={(model) => { this.onSubmit(model) }}
                    // data = {this.state}
                    role="UPDATE"
                // isFetching = {isLoading}
                />


            </div>
        )
    }
}


SingleGist.prototypes = {
    isLoading: PropTypes.bool,
    currentGist: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.gistsReducer.isLoading,
    currentGist: state.gistsReducer.notebookReducer.currentGist,
})

const mapDispatchToProps = dispatch => ({
    gistsActions: bindActionCreators(gistsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleGist);