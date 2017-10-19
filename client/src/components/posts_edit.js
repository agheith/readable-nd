import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost } from '../actions';

class PostsEdit extends Component{


    render(){
        return(
            <dov>Edit Component</dov>
        );
    }
}

export default reduxForm({
    form: 'PostsEditForm'
})(
    connect(null, { editPost })(PostsEdit)
);
