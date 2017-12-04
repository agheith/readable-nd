import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost, fetchPosts } from '../actions';

class PostsEdit extends Component {

    componentWillMount() {
        this.props.fetchPosts(this.props.match.params.id);
    }

    componentDidMount() {
        this.handleInitialValues();
    }

	onSubmit(values) {
		const { editPost, match: { params: { id, category } }, history } = this.props;
		editPost(id, values, () => {
			history.push(`/${category}/${id}`)
		});
	}

    handleInitialValues() {
        if (this.props.post) {
            const initialValues = {
				title: this.props.post.title,
				body: this.props.post.body,
            };
            this.props.initialize(initialValues);
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group col-sm-12 ${touched && error ? 'has-danger' : ''}`;

        return (
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

    render() {
        const { handleSubmit } = this.props;
        //handleSubmit comes from redux-form

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title"
                        name="title"
                        component={this.renderField}
                    />

                    <Field
                        label="Say Something Nice!"
                        name="body"
                        component={this.renderBodyField}
                    />

                    <div className="my-buttons">
                        <button type="submit" className="edit-button btn btn-primary">Edit</button>
                        <Link to="/" className="btn btn-danger">Cancel</Link>
                    </div>

                </form>
            </div>
        );
    }
}

function validate(values) {
    // console.log(values);
    const errors = {};

    //Validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is at least 3 characters!';
    }

    if (!values.body) {
        errors.body = 'Enter some content';
    }

    //if the error object is empty, the form is fine to submit
    return errors;
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] };
}

export default reduxForm({
    validate,
    form: 'PostsEditForm',
})(
    connect(mapStateToProps, {
        editPost,
        fetchPosts
     })(PostsEdit)
);
