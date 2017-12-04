import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createPost, fetchCategories } from '../actions';

class PostsNew extends Component {
	componentWillMount() {
		this.props.fetchCategories();
	}

    onSubmit(values) {
        console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group col-sm-6 ${touched && error ? 'has-danger' : ''}`;

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

    renderBodyField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group col-sm-12 ${touched && error ? 'has-danger' : ''}`;

    return (
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

	renderCategoryField(field) {
		const { categories } = this.props;
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>

				<select {...field.input} className="form-control">
					<option className="disabled">
						Select a Category
					</option>

					{categories.map((category) => (
						<option key={category.path} value={category.name}>
							{category.name}
						</option>
					))}

				</select>

				<div className="form-control-feedback">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
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
                    <Field
                        label="Category"
                        name="category"
                        component={field => this.renderCategoryField(field)}
                    />
					<Button type="submit" color="primary" className="edit-button">
                        Submit
                    </Button>
                    <Link to="/" className="btn btn-danger">
                        Cancel
                    </Link>
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
    if (!values.author) {
        errors.author = 'Enter your name please';
    }
    if (!values.body) {
        errors.body = 'Enter some content';
    }
    if (!values.category) {
		errors.category = 'Choose a Category';
	}

    //if the error object is empty, the form is fine to submit
    return errors;
}

function mapStateToProps(state) {
	return { categories: state.categories.all };
}

export default reduxForm({
	validate,
	form: 'PostsNewForm',
})(
	connect(mapStateToProps, {
		createPost,
		fetchCategories,
	})(PostsNew)
);
