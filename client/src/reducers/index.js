import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import PostsOrderReducer from './reducer_sorting';
import CategoriesReducer from './reducer_categories';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
	posts: PostsReducer,
	postsOrder: PostsOrderReducer,
	categories: CategoriesReducer,
	comments: CommentsReducer,
	form: formReducer,
});

export default rootReducer;
