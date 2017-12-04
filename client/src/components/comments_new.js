import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createComment } from '../actions';

class CommentsNew extends Component {

    onSubmit(values) {
        const id = this.props.match.params.id;
        this.props.createComment(values, id, () => {
            this.props.history.push(`/posts/${id}`);
        });
    }

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

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

	render() {
		const { handleSubmit, match: { params: { id } } } = this.props;
		return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Comment"
                        name="body"
                        component={this.renderField}
                    />
                    <Field
                        label="Author"
                        name="author"
                        component={this.renderField}
                    />
                    <Button type="submit" color="primary" className="edit-button">
                        Submit
                    </Button>
                    <Link to={`/posts/${id}`} className="btn btn-danger btn-md">
                        Cancel
                    </Link>
    		    </form>
            </div>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.author) {
		errors.author = 'Name missing';
	}
	if (!values.body) {
		errors.body = 'Comment missing';
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'CommentsNewForm',
})(
	connect(null, {
		createComment,
	})(CommentsNew)
);
