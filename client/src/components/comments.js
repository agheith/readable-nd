import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostComments } from '../actions';

class Comments extends Component{

    componentWillMount(){
        this.props.fetchPostComments(this.props.postId)
    }


    render(){
        // console.log(this.props.comments);
        return(
            <div>
                Comments
            </div>
        );
    }
}

function mapStateToProps(state){
    const comments = _.filter(state.comments, comment => !comment.deleted);
    return { comments };
}


export default connect(mapStateToProps, {
    fetchPostComments,
})(Comments);
