import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions'

class CategoriesList extends Component{

    componentDidMount(){
        this.props.fetchCategories();
    }

    renderCategories(){
        if(this.props.categories){
            return _.map(this.props.categories, (category, index) => {
                return (
                    <li key={index} className="list-group-item">
                        <Link to ="/">
                            {category.name}
                        </Link>
                    </li>
                );
            })
        }

    }



    render(){
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

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
