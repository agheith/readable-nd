import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts, post => {
            return(
                <li key={post.id} className="list-group-item">
                    <button type="button"
                            className="btn btn-info btn-sm"
                        >
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                        Like
                    </button>
                    {post.title}
                    <button type="button"
                            className="btn btn-danger btn-sm"
                        >
                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                        Like
                    </button>
                </li>
            );
        });
    }


    render(){
        console.log(this.props.posts);
        return(
            <div>
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
        )
    }
}


function mapStateToProps(state){
    return { posts: state.posts };
}



export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
