import _ from 'lodash';
import { FETCH_POST_COMMENTS } from '../actions';

export default function (state = {}, action){
    switch(action.type){

        case FETCH_POST_COMMENTS:
            console.log(action);
            return _.mapKeys(action.payload, 'id');

        default:
            return state;
    }
}
