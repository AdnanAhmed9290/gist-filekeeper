import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gistsActions from '../../actions/gists.actions';

import DynamicForm from './component/DynamicForm.view';

class AddGist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            description: '',
            files: [
                {name: '', content: ''}
            ]
        }
    }

    saveGist = (data) => {
        

        // this.setState({isLoading: true});
        // const token = "token "+localStorage.getItem('access_token')
        // // console.log('token', token);
        // axios({

        //     url: `https://api.github.com/gists`,
        //     method: "POST",
        //     data,
        //     headers: {
        //         "Authorization": token,
        //         'Content-Type': 'application/json'
        //     }

        // }).then(resp => {
        //     console.log(resp)
        //     this.setState({isLoading: false})
        //     alert('Gist Added, it may take some seconds to load into App');
        //     this.props.history.push('/gists');
        // }).catch(err => {
        //     this.setState({isLoading: false})
        //     console.log("Create Error: ", err)
        // })

        this.props.gistsActions.createGist(data)

    }


    render() {


        return (
            <div className="container">
                <h1>Create new Gists</h1>
    
                <DynamicForm 
                    className="createForm"
                    onSubmit = {(model) => {this.saveGist(model)}}
                    data = {this.state}
                    role= "CREATE"
                    isFetching = {this.state.isLoading}
                />

            </div>
        )
    }
}

// const mapStateToProps = state => {     
//     const {isLoading} =state.gistsReducer;     
//     return {isLoading} 
// } 

const mapDispatchToProps = dispatch => ({     
    gistsActions: bindActionCreators(gistsActions, dispatch)
}); 


export default connect(null, mapDispatchToProps)(AddGist);