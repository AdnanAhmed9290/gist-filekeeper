import React, {Component} from 'react'
import { connect } from 'react-redux'


class DynamicForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: this.props.currentGist.description,
            files: this.props.currentGist.files,
            removeFiles: []
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {description, files, removeFiles} = this.state
        
        const data = {
            "description": description,
            "public": true,
            "files": {}
        }


        for(let i=0; i<files.length; i++) {
            let names = files[i].name;
            let content = files[i].content;
            data.files[names] = {
                content
            }
        }

        if(removeFiles.length !== 0 && this.props.role === 'UPDATE') {

            for(let i = files.length, j=0 ; i < (files.length + removeFiles.length) ; i++,j++ ) {
                let names = this.state.removeFiles[j];
                console.log("Removed",names)
                data.files[names] = null
            }

        }

        console.log(data);

        if (this.props.onSubmit) 
            this.props.onSubmit(data);

            
    }

    addFile = (e) => {
        this.setState((prevState)=> ({
            files: [...prevState.files, {name: "", content: ""}]
        }))
    }

    removeFile = (index) => {
        this.setState({
            removedFiles : this.state.removeFiles.push(this.state.files[index].name)
        })
        this.setState({
            files: this.state.files.filter((f, fidx) => index !== fidx)
        })
    }

    onChange = (e) => {
        if(['content','name'].includes(e.target.className)) {
            let files = [ ...this.state.files]
            files[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({files})
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }


    
    render() {

        const { files, description } = this.state;
        const { styles } = DynamicForm;


        return (
            <div className='dynamic-form my-5 text-left' >
                <form
                    className="dynamic-form"
                    onSubmit={e => this.onSubmit(e)}
                    onChange={this.onChange}>
                    <div className="form-group mb-5">

                        <input
                            type="text"
                            name="description"
                            id="description"
                            className="form-control"
                            value={description}
                            placeholder="Enter Gist Description"/>

                    </div>

                    {files.map((file, index) => {

                        let fileID = `file-${index}`,
                            contentID = `content-${index}`
                        return (

                            <div
                                className="form-group"
                                key={index}
                                style={{
                                position: 'relative'
                            }}>

                                <div className="btn-group"  style={styles.removeBtn}>

                                    {this.props.role === 'UPDATE' && 
                                        <a href={file.raw_url} target="_blank" className="btn btn-info">View Raw</a>
                                        
                                    }
                                    {files.length > 1 && 
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => this.removeFile(index)}>Remove File</button>
                                    }
                                </div>
                                
                                <input
                                    type="text"
                                    style={styles.fileInput}
                                    name={fileID}
                                    data-id={index}
                                    value={files[index].name}
                                    className="name"
                                    placeholder="Enter File name with extension"/>

                                <textarea
                                    className="content"
                                    rows="8"
                                    style={styles.contentArea}
                                    id={contentID}
                                    data-id={index}
                                    name={contentID}
                                    value={files[index].content}
                                    placeholder="Enter content......"></textarea>
                                {files.length !== index + 1 && <hr className="my-4"/>}
                            </div>

                        )
                    })}

                    <div className="btn-group">

                        <button className="btn btn-primary mr-1" type="button" onClick={(e) => {this.addFile()}}>Add File</button>
                        <button type="submit" className="btn btn-primary">
                            {
                                this.props.role === 'CREATE' ? 'Create Public Gist' : 'Update Gist'
                            }
                        </button>

                    </div>
                </form>
            </div>
        )
    }

}

DynamicForm.styles = {
    fileInput: {
        maxWidth: '300px',
        display: 'block',
        width: '100%',
        padding: '.375rem .75rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        color: '#495057',
        backgroundColor: '#fff',
        backgroundClip: 'paddingBox',
        border: '1px solid #ced4da',
        borderRadius: '.25rem',
        transition: 'borderColor .15s easeInOut,boxShadow .15s easeInOut'
    },
    contentArea: {
        display: 'block',
        marginTop: '1em',
        width: '100%',
        padding: '.375rem .75rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        color: '#495057',
        backgroundColor: '#fff',
        backgroundClip: 'paddingBox',
        border: '1px solid #ced4da',
        borderRadius: '.25rem',
        transition: 'borderColor .15s easeInOut,boxShadow .15s easeInOut'
    },
    removeBtn: {
        position: 'absolute',
        right: '0',
        top: '0'
    }

}

DynamicForm = connect(state=> ({
    isLoading: state.gistsReducer.notebookReducer.isLoading,
    currentGist: state.gistsReducer.notebookReducer.currentGist 
}),null)(DynamicForm)

export default DynamicForm;