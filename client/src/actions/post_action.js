import axios from 'axios';
import uuid from 'uuid';
import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  SORT_POSTS,
} from './types';
import { ROOT_URL, AUTH_HEADERS } from './constants';

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function fetchPosts() {
  return dispatch => {
    axios.get(`${ROOT_URL}/posts`).then(res => dispatch({
        type: FETCH_POSTS,
        payload: res.data
    }));
  };
}

export function fetchPost(id) {
  return dispatch => {
    axios.get(`${ROOT_URL}/posts/${id}`).then(res => dispatch({
        type: FETCH_POST,
        payload: res.data
    }));
  };
}

export function createPost(values, callback) {
  const { author, body, category, title } = values;

  const data = {
    id: uuid(),
    timestamp: Date.now(),
    author,
    body,
    category,
    title,
  };

  return dispatch => {
    axios.post(`${ROOT_URL}/posts`, data).then(res => {
      callback();
      dispatch({
          type: CREATE_POST,
          payload: res.data
      });
    });
  };
}

export function editPost(id, values, callback) {
  return dispatch => {
    axios.put(`${ROOT_URL}/posts/${id}`, values).then(res => {
      callback();
      dispatch({
          type: EDIT_POST,
          payload: res.data
      });
    });
  };
}

export function deletePost(id, callback) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/posts/${id}`).then(res => {
      callback();
      dispatch({
        type: DELETE_POST,
        payload: res.id });
    });
  };
}

export function votePost(id, vote) {
  return dispatch => {
    axios.post(`${ROOT_URL}/posts/${id}`, { option: vote }).then(res =>
    dispatch({
        type: VOTE_POST,
        payload: res.data
    }));
  };
}

export function sortPosts(sortType) {
  return {
    type: SORT_POSTS,
    payload: sortType,
  };
}

export function fetchCategoryPosts(category) {
  return dispatch => {
    axios.get(`${ROOT_URL}/${category}/posts`).then(res => dispatch({
        type: FETCH_POSTS,
        payload: res.data
    }));
  };
}
