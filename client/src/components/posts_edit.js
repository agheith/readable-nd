import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost } from '../actions';

class PostsEdit extends Component{


    render(){
        return(

        );
    }
}

export default reduxForm({
    validate,
    form: 'PostsEditForm'
})(
    connect(null, { editPost })(PostsEdit)
);
