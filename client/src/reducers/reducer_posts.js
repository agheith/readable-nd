import _ from 'lodash';
import {
	FETCH_POSTS,
	FETCH_POST,
	EDIT_POST,
	VOTE_POST,
	DELETE_POST,
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_POSTS:
            console.log(action.payload);
			return _.mapKeys(action.payload, 'id');

		case FETCH_POST:
			return {
				...state, [action.payload.id]: action.payload
			};

		case EDIT_POST:
			return {
				...state, [action.payload.id]: action.payload,
			};

		case VOTE_POST:
			return {
				...state, [action.payload.id]: action.payload,
			};

		case DELETE_POST:
			return _.omit(state, action.payload);

		default:
			return state;
	}
}
