import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise'
import thunk from 'redux-thunk';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import PostsEdit from './components/posts_edit';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, applyMiddleware(thunk))}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={PostsIndex} />
                <Route exact path="/:category"  component={ props => <PostsIndex {...props} />} />
                <Route exact path="/posts/new" component={PostsNew} />
                <Route path="/:category/edit/:id" children={ props => <PostsEdit {...props} /> } />
                <Route path="/:category/:id" component={PostsShow} />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
