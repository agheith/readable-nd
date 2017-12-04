import _ from 'lodash';
import {
	FETCH_POST_COMMENTS,
	FETCH_COMMENT,
	FETCH_COMMENTS_COUNT,
	VOTE_COMMENT,
	DELETE_COMMENT,
} from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {

		case FETCH_POST_COMMENTS:
			console.log(action);
			return _.mapKeys(action.payload, 'id');

		case FETCH_COMMENT:
			return {
				...state, [action.payload.id]: action.payload
			};

		case FETCH_COMMENTS_COUNT:
			return {
				...state, count: action.payload
			};

		case VOTE_COMMENT:
			return {
				...state, [action.payload.id]: action.payload
			};

		case DELETE_COMMENT:
			return _.omit(state, action.payload);

		default:
			return state;
	}
}
