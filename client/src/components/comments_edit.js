import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { editComment, fetchComment } from '../actions/index';

class CommentsEdit extends Component {
	componentWillMount() {
		this.props.fetchComment(this.props.match.params.id);
	}

	componentDidMount() {
		this.handleInitialize();
	}

	onSubmit(values) {
		const { editComment, match: { params: { id } }, history } = this.props;

		editComment(id, values, () => {
			history.push('/');
		});
	}

	handleInitialize() {
		if (this.props.comment) {
			const initData = {
				body: this.props.comment.body,
			};
			this.props.initialize(initData);
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

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Edit Comment"
					name="body"
					component={this.renderField}
				/>
				<Button className="edit-button" type="submit" color="primary">Edit Comment</Button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.body) {
		errors.body = 'Edit Comment';
	}
	return errors;
}

function mapStateToProps(state, ownProps) {
	return { comment: state.comments[ownProps.match.params.id] };
}

export default reduxForm({
	validate,
	form: 'CommentsEditForm',
})(connect(mapStateToProps, { editComment, fetchComment })(CommentsEdit));
