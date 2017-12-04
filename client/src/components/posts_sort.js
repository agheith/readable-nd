import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'reactstrap';
import { fetchPosts, fetchCategoryPosts, sortPosts } from '../actions/index';
import SinglePost from './single_post';

class PostsSort extends Component {
	componentWillMount() {
		if (this.props.match.params.category) {
			this.props.fetchCategoryPosts(this.props.match.params.category);
		} else {
			this.props.fetchPosts();
		}
	}

	renderPosts() {
		const { posts } = this.props;
		if (posts) {
			const orderedPosts = _.sortBy(posts, this.props.postsOrder).reverse();
			return orderedPosts.map((post) => (
				<SinglePost key={post.id} post={post} />
			));
		}
	}

	render() {
		const { sortPosts } = this.props;
		return (
			<div>
				<div className="">

					<ButtonGroup className="">
						<Button
							className=""
							size="sm"
							value="date"
							onClick={() => sortPosts('timestamp')}
						>
							Date
						</Button>
                        <Button
                            className=""
                            size="sm"
                            value="score"
                            onClick={() => sortPosts('voteScore')}
                        >
                            Score
                        </Button>
					</ButtonGroup>
				</div>
				<div>{this.renderPosts()}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const posts = _.filter(state.posts, post => !post.deleted);
	const { postsOrder } = state;
	return { posts, postsOrder };
}

export default connect(mapStateToProps, {
	fetchPosts,
	fetchCategoryPosts,
	sortPosts,
})(PostsSort);
