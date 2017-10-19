import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, categoryPost } from '../actions'

class CategoriesList extends Component{

    componentWillMount(){
        this.props.fetchCategories();
    }

    renderCategories(){
        if(this.props.categories){
            return _.map(this.props.categories, (category, index) => {
                return (
                    <li key={index} className="list-group-item">
                        <Link to={`/${category.path}`} onClick={() => categoryPost(category.path)}>
                            {category.name}
                        </Link>
                    </li>
                );
            })
        }
    }



    render(){

        const { categories } = this.props

        if (!categories){
            return <div>Loading....</div>
        }

        return(
            <div className="col-sm-3 pull-left categories">
                <div>
                    <h4>Choose a category:</h4>
                    <ul className="list-group">
                        {this.renderCategories()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { categories: state.categories }
}

export default connect(mapStateToProps, { fetchCategories, categoryPost })(CategoriesList);
