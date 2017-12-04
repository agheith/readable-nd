import React, { Component } from 'react';
import PostsSort from './posts_sort';
import CategoriesList from './categories_list';

class PostsIndex extends Component {
	render() {
		return (
			<div>
				<div className="col-8">
					<CategoriesList />
					<PostsSort {...this.props} />
				</div>
			</div>
		);
	}
}

export default PostsIndex;
