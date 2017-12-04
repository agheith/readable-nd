import React from 'react';
import PostsSort from './posts_sort';
import CategoriesList from './categories_list';

const PostsIndex = (props) =>
	<div>
		<div className="col-8">
			<CategoriesList />
			<PostsSort {...props} />
		</div>
	</div>;

export default PostsIndex;
