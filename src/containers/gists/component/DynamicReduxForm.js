import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

class DynamicReduxForm extends React.Component {

  // constructor(props) {
  //   this.state
  // }

  onSubmit = (values) => {
    
    const { description, files } = values

    const data = {
      "description": description,
      "public": true,
      "files": {}
    }


    for (let i = 0; i < files.length; i++) {
      let names = files[i].name;
      let content = files[i].content;
      data.files[names] = {
        content
      }
    }

    console.log("Data:", data);

  }


  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input className="form-control" {...input} type={type} placeholder="Filename..."
          style={{ maxWidth: '300px' }} required />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )


  renderFormItem = (item, index, fields) => {

    const handleClick = () => {
      fields.remove(index)
    }

    return (
      <div className="form-group mb-3" key={index} style={{ position: 'relative' }}>
        <Field
          component={this.renderField}
          name={`${item}.name`}
          label={`File#${index + 1}`}
          type="text" />

        <Field
          component='textarea'
          name={`${item}.content`}
          className="form-control mt-3"
          rows="8"
          required />

        <div className="btn-group" style={{position: 'absolute', top: 0, right: 0}}>

          {this.props.role == 'UPDATE' &&
            <a href={this.props.initialValues.files[index].raw_url} target="_blank" className="btn btn-info">View Raw</a>
          }
          {fields.length > 1 &&
            <button
              type="button"
              className="btn"
              onClick={handleClick}>Remove File</button>
          }
        </div>
      </div>
    )
  }

  renderfiles = ({ fields, meta: { touched, error, submitFailed } }) => {
    return (
      <div className="files" style={{ margin: '1em 0' }}>
        {fields.map(this.renderFormItem)}

        <div className="btn-group">
          <button type="button" className="btn btn-default" onClick={() => fields.push({})}>Add File</button>
          {(touched || submitFailed) && error && <span>{error}</span>}
        </div>

      </div>
    )
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, role } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="text-left">
        <div className="form-group my-5">
          <Field
            name="description"
            type="text"
            component="input"
            label="Gist Description"
            placeholder="Enter Gile Description"
            className="form-control"
            required
          />
        </div>

        <FieldArray name="files" component={this.renderfiles} />

        <div className="btn-group mt-5">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {role === 'UPDATE' ? 'Update Gist' : 'Create New Gist'}
          </button>
          <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
            {role === 'UPDATE' ? 'Reset Form' : 'Clear Values'}
          </button>
        </div>
      </form>
    );
  }
};

DynamicReduxForm = reduxForm({
  form: 'DynamicReduxForm', // a unique identifier for this form
  //   validate,
})(DynamicReduxForm);

DynamicReduxForm = connect(state => ({
  initialValues: state.gistsReducer.currentGist
}), null)(DynamicReduxForm)

export default DynamicReduxForm;