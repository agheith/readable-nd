import _ from 'lodash';
import { FETCH_POSTS,
         FETCH_POST,
         EDIT_POST,
         DELETE_POST,
         VOTE_POST,
         CATEGORY_POST
     } from '../actions';

export default function (state={}, action){
    switch(action.type){

    case FETCH_POST:
        return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_POSTS:
        // console.log(action);
        return _.mapKeys(action.payload.data, 'id')

    case EDIT_POST:
        console.log(action);
        return { ...state, [action.payload.id]: action.payload}

    case DELETE_POST:
        return _.omit(state, action.payload)

    case VOTE_POST:
        return { ...state, [action.payload.id]: action.payload }

    case CATEGORY_POST:
        return _.mapKeys(action.payload, 'id')

    default:
        return state;
    }
}
