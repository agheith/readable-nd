import _ from 'lodash';
import { FETCH_CATEGORIES } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return action.payload.categories;

        

        default:
            return state;
    }
}
