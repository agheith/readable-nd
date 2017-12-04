import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardText,
	CardBlock,
	CardTitle,
} from 'reactstrap';
import Fontawesome from 'react-fontawesome';
import formatTimestamp from '../helper/time_stamp';
import { fetchCommentsCount, votePost, deletePost } from '../actions/index';

class SinglePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
            count: 0
        };
	}

	componentWillMount() {
		this.props.fetchCommentsCount(this.props.post.id, data => {
			this.setState({
                count: data.length
            });
		});
	}

	onDeleteButton(id) {
		this.props.deletePost(id, () => {});
	}

	render() {
		const { post, votePost } = this.props;
		return (
			<div key={post.id}>

				<Card className="col-md-8" style={{ backgroundColor: '#fffff0', borderColor: '#8357c5' }}>

					<CardBlock>
						<CardTitle>
							<Link to={`posts/${post.id}`}>{post.title}</Link>
							<p>by: {post.author}</p>
							<div>
								<Fontawesome
									name='thumbs-up'
									style={{ color: '#5cb85c', marginRight: '10px' }}
									onClick={() => {
										votePost(post.id, 'upVote');
									}}
								/>
								{post.voteScore}
								<Fontawesome
									name="thumbs-down"
									style={{ color: '#d9534f', marginLeft: '10px' }}
									onClick={() => {
										votePost(post.id, 'downVote');
									}}
								/>
							</div>

						</CardTitle>

						{post.body}<hr />

						<CardText>
							<span>
								Posted on: {formatTimestamp(post.timestamp)}
							</span>

						</CardText>

					</CardBlock>

						<span>
							<Fontawesome
								name="comment-o"
								size='3x'
								style={{ color: '#428bca', marginRight: '10px' }}
							/>
							{this.state.count}
							<span className="single-post-button">
								<Link to={'/'}>
								<Button onClick={() => this.onDeleteButton(post.id)}>
									<Fontawesome
										name="times-circle"
										size='3x'
										style={{ color: '#d9534f', marginRight: '10px' }}
									/>
								</Button>
								</Link>
							</span>
							<span className="single-post-button">
								<Link to={`/${post.category}/edit/${post.id}`}>
									<Fontawesome
										name="pencil-square-o"
										size='3x'
										style={{ color: '#5cb85c', marginRight: '10px' }}
									/>
								</Link>
							</span>
						</span>

				</Card>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { count } = state.comments;
	return { count };
}

export default connect(mapStateToProps, {
	fetchCommentsCount,
	votePost,
	deletePost,
})(SinglePost);
