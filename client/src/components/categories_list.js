import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ListGroupItem } from 'reactstrap';
import { fetchCategories } from '../actions';

class CategoriesList extends Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	renderCategories() {
		const { categories } = this.props;
		if (categories) {
			return categories.map((category) => {
				return (
					<li key={category.path} className="list-group-item">
						<Link to={`/${category.path}`}>{category.name}</Link>
					</li>
				);
			});
		}
		return <div>loading categories...</div>;
	}

	render() {
		return (
			<div className="col-sm-4 pull-right">
				<h2>Categories</h2>
			<ListGroupItem>
				<Link to="/">
					All Categories
				</Link>
			</ListGroupItem>
			<ul className="list-group">{this.renderCategories()}</ul>
			<p className="add-post">
				<Link to="posts/new">
					<Button color="primary">Add a Post</Button>
				</Link>
			</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { categories: state.categories.all };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
