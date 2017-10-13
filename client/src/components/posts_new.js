import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component{

    renderField(field){

        const { meta: { touched, error } } = field;
        const className = `form-group col-sm-6 ${touched && error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
            <div className="text-help">
                {touched ? error : ''}
            </div>
            </div>
        );
    }

    renderBodyField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group col-sm-12 ${touched && error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <textarea
                    className="form-control my-text"
                    type="text"
                    {...field.input}
                />
            <div className="text-help">
                {touched ? error : ''}
            </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push("/")
        });
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
                        label="Author"
                        name="author"
                        component={this.renderField}
                    />
                    <Field
                        label="Post Content"
                        name="body"
                        component={this.renderBodyField}
                    />
                <div className="my-buttons">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
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
    if(!values.author){
        errors.author = "Enter your name please";
    }
    if(!values.body){
        errors.body = "Enter some content";
    }

    //if the error object is empty, the form is fine to submit
    return errors
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);
