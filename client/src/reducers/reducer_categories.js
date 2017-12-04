import { FETCH_CATEGORIES } from '../actions/types';

const INITIAL_VAL = {
	all: [],
};

export default function (state = INITIAL_VAL, action) {
	switch (action.type) {

		case FETCH_CATEGORIES:
			return { ...state, all: action.payload.categories };

		default:
			return state;
	}
}
