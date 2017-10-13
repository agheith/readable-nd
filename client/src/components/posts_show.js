import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component{

    componentDidMount(){
        if(this.props.post){
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick(){
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    render(){

        const { post } = this.props;

        if(!post){
            return <div>Loading....</div>
        }

        return(
            <div>
                <Link to="/">Back to Index</Link>
                <div className="flexthem">
                    <button
                        className="add-post btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete Post
                    </button>
                    <button
                        className="add-post btn btn-info pull-xs-right"
                    >
                        Edit Post
                    </button>
                </div>
                <div className="list-group-item post-show">
                    <h3>{post.title}</h3>
                    <h6>Posted By: {post.author}</h6>
                    <p>{post.body}</p>
                </div>
            </div>
        );
    };
}

function mapStateToProps({ posts }, ownProps){
    return { post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
