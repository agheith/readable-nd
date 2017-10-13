import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';

class CategoriesList extends Component{



    render(){
        return(
            <div className="col-sm-3 pull-left categories">
                <div>
                    <h4>Choose a category:</h4>
                    <div className="list-group-item">
                        <Link to="/">All</Link>
                    </div>
                    <div className="list-group-item">
                        <Link to="/">React</Link>
                    </div>
                    <div className="list-group-item">
                        <Link to="/">Redux</Link>
                    </div>
                    <div className="list-group-item">
                        <Link to="/">Udacity</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoriesList;
