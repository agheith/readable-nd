import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsIndex from './posts_index';
import PostsEdit from './posts_edit';
import PostsShow from './posts_show';
import PostsNew from './posts_new';
import Readable from './readable';
import CommentsNew from './comments_new';
import CommentsEdit from './comments_edit';

class App extends Component {
	render() {
		return (
			<div>
				<Readable />
				<div>
					<Switch>
						<Route exact path="/" component={PostsIndex} />
						<Route exact path="/:category" component={props => <PostsIndex {...props} />} />
						<Route exact path="/posts/new" component={PostsNew} />
						<Route exact path="/:category/edit/:id" children={props => <PostsEdit {...props} />} />
						<Route exact path="/:category/:id" component={PostsShow} />
						<Route path="/:category/:id/comments/new" component={CommentsNew} />
						<Route exact path="/posts/:postId/comments/edit/:id" children={props => <CommentsEdit {...props} />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
