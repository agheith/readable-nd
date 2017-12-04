import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button, ButtonGroup } from 'reactstrap';
import Fontawesome from 'react-fontawesome';
import { fetchPostComments, deleteComment, voteComment } from '../actions/index';

class Comments extends Component {
  componentWillMount() {
    const { fetchPostComments, postId } = this.props;
    fetchPostComments(postId);
  }

  onDeleteButton(id) {
    const { fetchPostComments, postId, deleteComment } = this.props;

    deleteComment(id, () => {
      fetchPostComments(postId);
    });
  }

  renderComments() {
    const { voteComment, comments, postId } = this.props;

    if (comments) {
      return _.map(comments, (comment, id) => {
        return (
          <div key={id}>

              <Card className="col-md-8" style={{ backgroundColor: '#fffff0', borderColor: '#8357c5' }}>

                  <div>
                    {comment.body}
                  </div>
                  <div>
                      This comment is by : <strong>{comment.author}</strong>
                  </div>

                  <div>
                      <Fontawesome
                          name='thumbs-up'
                          style={{ color: '#5cb85c', marginRight: '10px' }}
                          onClick={() => {
                              voteComment(comment.id, 'upVote');
                          }}
                      />
                     {comment.voteScore}
                      <Fontawesome
                          name="thumbs-down"
                          style={{ color: '#d9534f', marginLeft: '10px' }}
                          onClick={() => {
                              voteComment(comment.id, 'downVote');
                          }}
                      />
                  </div>

                  <div className="ml-auto p-4">
                      <ButtonGroup>
                        <Link to={`${postId}/comments/edit/${comment.id}`}>
                            <Fontawesome
                                name="pencil-square-o"
                                size='2x'
                                style={{ color: '#5cb85c', marginRight: '10px' }}
                            />
                        </Link>
                        <Button>
                            <Fontawesome
                                onClick={() => this.onDeleteButton(comment.id)}
                                name="window-close"
                                size='2x'
                                style={{ color: '#d9534f', marginRight: '10px' }}
                            />
                        </Button>
                      </ButtonGroup>

                </div>

              </Card>
          </div>
        );
      });
    }
    return <div>Loading...</div>;
  }

  render() {
    return (
      <div>
        {this.renderComments()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const comments = _.filter(state.comments, comment => !comment.deleted);
  return { comments };
}

export default connect(mapStateToProps, {
  fetchPostComments,
  voteComment,
  deleteComment
})(Comments);
