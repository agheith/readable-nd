import { SORT_POSTS } from '../actions/types';

const INITIAL_VAL = 'votescore';

export default function (state = INITIAL_VAL, action) {
	switch (action.type) {

		case SORT_POSTS:
			return action.payload;

		default:
			return state;
	}
}
