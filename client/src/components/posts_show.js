import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBlock,
  CardTitle,
} from 'reactstrap';
import Fontawesome from 'react-fontawesome';
import { fetchPost, fetchPostComments, fetchCommentsCount, votePost, deletePost } from '../actions';
import Comments from './comments';
import NotFound from './not_found';

class PostsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0
    };
  }

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchPostComments(this.props.match.params.id);
    this.props.fetchCommentsCount(this.props.match.params.id, data => {
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
    return !post
      ?
      <NotFound />
      :
      <div>
          <Card className="col-md-12" style={{ backgroundColor: '#fffff0', borderColor: '#8357c5' }}>

            <CardBlock>
              <CardTitle>
                {post.title}
                <p>Posted By: {post.author}</p>
              </CardTitle>
              <div>
                {post.body}
                <div>
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
                    <span>
                        <Fontawesome
                            name="comment-o"
                            size='2x'
                            style={{ color: '#428bca', marginRight: '10px' }}
                        />
                        {this.state.count}
                        <span className="single-post-button">
                            <Link to={'/'}>
                            <Button onClick={() => this.onDeleteButton(post.id)}>
                                <Fontawesome
                                    name="times-circle"
                                    size='2x'
                                    style={{ color: '#d9534f', marginRight: '10px' }}
                                />
                            </Button>
                            </Link>
                        </span>
                        <span className="single-post-button">
                            <Link to={`/${post.category}/edit/${post.id}`}>
                                <Fontawesome
                                    name="pencil-square-o"
                                    size='2x'
                                    style={{ color: '#5cb85c', marginRight: '10px' }}
                                />
                            </Link>
                        </span>
                    </span>
                </div>
              </div>

            </CardBlock>
          </Card>

          <div className="comment-button">
            <Link to={`/${post.category}/${post.id}/comments/new`}>
                <Button color="primary">Add a Comment</Button>
            </Link>
            <Link to="/">
              <Button color="danger">Back</Button>
            </Link>
          </div>

          <Comments postId={post.id} />

        </div>;
  }
}

function mapStateToProps(state, ownProps) {
  const comments = _.filter(state.comments, comment => !comment.deleted);
  return { post: state.posts[ownProps.match.params.id],
    comments };
}

export default connect(mapStateToProps, {
  fetchPost,
  fetchPostComments,
  fetchCommentsCount,
  deletePost,
  votePost,
})(PostsShow);
