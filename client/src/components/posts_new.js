import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component{

    renderField(field){
        return(
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
            {field.meta.error}
            </div>
        );
    }

    onSubmit(values){
        console.log(values);
    }

    render(){

        const { handleSubmit } = this.props;
        //handleSubmit comes from redux-form

        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        label="Categories"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        label="Post Content"
                        name="content"
                        component={this.renderField}
                    />
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

function validate(values){
    // console.log(values);
    const errors = {};

    //Validate the inputs from 'values'
    if(!values.title || values.title.length < 3){
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if(!values.categories){
        errors.categories = "Enter a Category";
    }
    if(!values.content){
        errors.content = "Enter some content";
    }

    //if the error object is empty, the form is fine to submit
    return errors
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);
