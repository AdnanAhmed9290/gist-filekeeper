import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gistsActions from '../../actions/GistsActions';
import DynamicReduxForm from './component/DynamicReduxForm';

class AddGist extends Component {

    componentWillMount() {
        this.props.gistsActions.resetCurrentGist()
    }

    saveGist = (data) => {

        this.props.gistsActions.createGist(data, ()=> {
            console.log('Gist saved')
            this.props.history.push('/gists')
        })

    }


    render() {

        const data = {
            description: 'Hello',
            files: [{'name': 'asda','content':'asdasdas' }]
        }
        return (
            <div className="container">
                <h1>Create new Gists</h1>
    
                <DynamicReduxForm 
                    className="createForm"
                    onSubmit = {(model) => {this.saveGist(model)}}
                    data = {data}
                    role= "CREATE"
                    // isFetching = {this.state.isLoading}
                />

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({     
    gistsActions: bindActionCreators(gistsActions, dispatch)
}); 


export default connect(null, mapDispatchToProps)(AddGist);

// export default AddGist