import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, votePost } from '../actions';
import CategoriesList from './categories_list';
import Comments from './comments';


class PostsIndex extends Component{

    componentWillMount(){
        this.props.fetchPosts();
    }

    renderPosts(){

        if(this.props.posts.length === 0){
            return <div>No posts available for this category yet!</div>
        }

        return _.map(this.props.posts, (post, index) => {
            return(
                <li key={index} className="list-group-item">
                    <Link to={`posts/${post.id}`}>
                        {post.title}
                    </Link>
                    <Link to={`${post.category}/edit/${post.id}`}>
                        <button
                            className="add-post btn btn-info pull-xs-right"
                        >
                            Edit Post
                        </button>
                    </Link>
                    <h6>Posted By: {post.author}</h6>
                    <h6>Category: {post.category}</h6>
                    <div>
                        <button
                            className="voting btn btn-primary"
                            onClick={() => {this.props.votePost(post.id, 'upVote')}}
                            >
                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        </button>
                        {post.voteScore}
                        <button
                            className="voting btn btn-danger"
                            onClick={() => {this.props.votePost(post.id, 'downVote')}}
                            >
                            <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                            </button>
                    </div>
                </li>
            );
        });
    }

    render(){
        console.log(this.props.posts);
        return(

            <div className="container-fluid">
                <div className="row">

                    <CategoriesList />

                    <div className="col-sm-8 pull-right">
                        <div className="text-xs-right">
                            <Link className="add-post btn btn-primary" to="/posts/new">
                                Add a Post
                            </Link>
                        </div>
                        <h3>Posts</h3>
                        <ul className="list-group">
                            {this.renderPosts()}
                        </ul>
                    </div>
                    <Comments />
                </div>
            </div>

        );
    }
}

function mapStateToProps(state){
    const posts = _.filter(state.posts, (post) => !post.deleted);
    return { posts };
}


export default connect(mapStateToProps, { fetchPosts, votePost })(PostsIndex);
